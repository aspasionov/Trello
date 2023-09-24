import {
  Avatar,
  Box,
  FormControl,
  FormLabel,
  Stack,
  Button
} from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'

interface UploaderI {
  selectedFile: Blob | null
  renderField: () => React.ReactNode
}

export const useImageUploader = (
  defaultPath: string,
  onChange: (f: Blob | null) => void
): UploaderI => {
  const [selectedFile, setSelectedFile] = useState<Blob | null>(null)
  const [preview, setPreview] = useState<string>('')

  useEffect(() => {
    if (selectedFile == null) {
      setPreview(defaultPath !== '' ? defaultPath : '')
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [selectedFile])

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files == null || e.target.files.length === 0) {
      setSelectedFile(null)
      onChange(null)
      return
    }
    setSelectedFile(e.target.files[0])
    onChange(e.target.files[0])
  }

  const handleRemove = (): void => {
    setSelectedFile(null)
    onChange(null)
    setPreview('')
  }

  const renderField = (): React.ReactNode => (
    <FormControl variant="floating">
      <FormLabel>Avatar</FormLabel>
      <Stack direction="row" spacing={4} alignItems="center">
        <label htmlFor="inputFile">
          <input
            id="inputFile"
            type="file"
            style={{ display: 'none' }}
            onChange={onSelectFile}
          />
          <Box
            cursor="pointer"
            p={2}
            bg="#3179ba"
            w={50}
            h={50}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="50%"
          >
            <DownloadIcon color="white" />
          </Box>
        </label>
        <Avatar bg="#3179ba" size="xl" src={preview} />
        <Button colorScheme="red" onClick={handleRemove}>
          Delete
        </Button>
      </Stack>
    </FormControl>
  )

  return {
    selectedFile,
    renderField
  }
}
