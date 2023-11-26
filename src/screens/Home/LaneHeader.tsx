import React, { useState } from 'react'
import { fetchColumns, updateColumn } from '@store/desk/asyncActions'
import type { ColumnT } from '@store/desk/types'
import { useAppDispatch } from '@store/store'
import {
  Box,
  Flex,
  Text,
  Button,
  Heading,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  Stack,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'
import ModalWindow from '@components/ModalWindow'
import Controls from '@components/Controls'

interface Props {
  title: string
  label: string
  id: string
  onDelete: () => void
}

const LaneHeader: React.FC<Props> = ({ title, label, onDelete, id }) => {
  const [open, setOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [column, setColumn] = useState<Partial<ColumnT>>({
    title,
    id,
    label
  })
  const dispatch = useAppDispatch()

  const handleOpenModal = (): void => {
    setOpen(true)
  }

  const handleCloseModal = (): void => {
    setOpen(false)
  }

  const handleEdit = (): void => {
    setModalOpen(true)
  }

  const handleChange = ({
    target: { name, value }
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setColumn((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const onSubmit = async (): Promise<void> => {
    if (column.title !== '' && column.label !== '') {
      await dispatch(updateColumn(column as ColumnT))
      await dispatch(fetchColumns())
      setModalOpen(false)
    }
  }

  return (
    <>
      <Flex align="center" justify="space-between">
        <Box>
          <Heading as="h5" size="sm">
            {title}
          </Heading>
          <Text fontSize="xs">{label}</Text>
        </Box>

        <Controls
          onEdit={handleEdit}
          onDelete={handleOpenModal}
        />
      </Flex>

      <Modal isCentered isOpen={open} size="xs" onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            {`Do you really wont to delete ${title}`}
          </ModalHeader>
          <ModalCloseButton onClick={handleCloseModal} />

          <ModalFooter>
            <Button colorScheme="blue" mr="auto" onClick={handleCloseModal}>
              No
            </Button>
            <Button variant="outline" onClick={onDelete}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ModalWindow
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
        }}
        onApply={() => {
          void (async () => {
            await onSubmit()
          })()
        }}
      >
        <Stack spacing={3} sx={{ pt: 10 }}>
          <FormControl variant="floating" isInvalid={column.title === ''}>
            <FormLabel>Title</FormLabel>
            <Input value={column.title} name="title" onChange={handleChange} />
            {column.title === '' && (
              <FormErrorMessage>Field is required</FormErrorMessage>
            )}
          </FormControl>
          <FormControl variant="floating" isInvalid={column.label === ''}>
            <FormLabel>Label</FormLabel>
            <Input value={column.label} name="label" onChange={handleChange} />
            {column.label === '' && (
              <FormErrorMessage>Field is required</FormErrorMessage>
            )}
          </FormControl>
        </Stack>
      </ModalWindow>
    </>
  )
}

export default LaneHeader
