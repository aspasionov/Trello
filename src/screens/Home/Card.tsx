import React, { useState, useEffect } from 'react'
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons'
import { addBackground } from '@api/cards.api'
import { renderImgPath } from '@utils/imgPath'
// import { useImageUploader } from '@hooks/useImageUploader'

import {
  Box,
  Flex,
  Input,
  Text,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Menu,
  Textarea
} from '@chakra-ui/react'

import { updateCard, deleteCard, fetchColumns } from '@store/desk/asyncActions'
import { useAppDispatch } from '@store/store'
import type { CardProps } from 'react-trello-ts/dist/components/Card'
import type { CardT } from '@store/desk/types'
import ModalWindow from '@components/ModalWindow'

const Card: React.FC<CardProps & { columnId: string; background: string }> = (
  props
) => {
  const { id, title, label, description, index, background } = props
  const [modalOpen, setModalOpen] = useState(false)
  const [card, setCard] = useState<CardT>({
    id,
    order: index,
    title: title ?? '',
    label: label ?? '',
    columnId: props.columnId,
    description: description ?? '',
    background: background ?? null
  })

  // const setFile = (file: Blob | null | string): void => {
  //   setCard((prev) => {
  //     return {
  //       ...prev,
  //       background: file
  //     }
  //   })
  // }

  // const { renderField } = useImageUploader(
  //   card.background !== null && card.background !== ''
  //     ? renderImgPath(card.background as string)
  //     : '',
  //   setFile
  // )

  const dispatch = useAppDispatch()

  const handleEdit = (): void => {
    setModalOpen(true)
  }

  const onSubmit = async (): Promise<void> => {
    try {
      if (
        card.background !== null &&
        card.background !== '' &&
        typeof card.background !== 'string'
      ) {
        const formData = new FormData()

        formData.append('background', card.background)
        await addBackground(card.id, formData)
      }
      await dispatch(updateCard(card))
      await dispatch(fetchColumns())
    } catch (e) {
      console.log(e)
    }

    setModalOpen(false)
  }

  const handleChange = ({
    target: { name, value }
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setCard((prev) => {
      return {
        ...prev,
        [name]: value,
        columnId: props.columnId
      }
    })
  }

  useEffect(() => {
    if (!modalOpen) {
      setCard((prev) => {
        return {
          ...prev,
          background
        }
      })
    }
  }, [modalOpen])

  const handleDelete = async (): Promise<void> => {
    await dispatch(deleteCard(id))
    await dispatch(fetchColumns())
  }
  const bgImg: string = renderImgPath(card.background as string)

  const isBgExist =
    card.background !== null &&
    typeof card.background === 'string' &&
    card.background !== ''
  const cardStyles = {
    p: 2,
    mb: 1,
    maxWidth: 250,
    rounded: 'md',
    bg: isBgExist
      ? `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${bgImg}) center/cover no-repeat`
      : 'white',
    ...(isBgExist && {
      '&  .chakra-heading': {
        color: 'white'
      }
    })
  }

  return (
    <Box sx={cardStyles}>
      <Flex align="center" justify="space-between">
        <Heading
          as="h6"
          size="xs"
          flexGrow={0}
          textOverflow="ellipsis"
          overflow="hidden"
          w="43%"
          flexShrink={0}
        >
          {card.title === '' ? (
            <Text color="#ccc">No title yet</Text>
          ) : (
            card.title
          )}
        </Heading>

        <Heading
          as="h6"
          size="xs"
          flexGrow={0}
          textOverflow="ellipsis"
          overflow="hidden"
          w="43%"
          flexShrink={0}
        >
          {card.label === '' ? (
            <Text color="#ccc">No label yet</Text>
          ) : (
            card.label
          )}
        </Heading>
      </Flex>

      <Flex mt={1} align="center" justify="space-between">
        <Heading
          as="h6"
          size="sm"
          flexGrow={1}
          textOverflow="ellipsis"
          overflow="hidden"
          w="70%"
          flexShrink={0}
        >
          {card.description === '' ? (
            <Text color="#ccc">No description yet</Text>
          ) : (
            card.description
          )}
        </Heading>
        <Box w="30%" sx={{ flex: '0 0 auto' }} flexGrow={0}>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <HamburgerIcon />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem
                onClick={() => {
                  void (async () => {
                    await handleDelete()
                  })()
                }}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>

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
          <FormControl variant="floating" id="first-name">
            <FormLabel>Title</FormLabel>
            <Input value={card.title} name="title" onChange={handleChange} />
          </FormControl>
          <FormControl variant="floating" id="first-name">
            <FormLabel>Label</FormLabel>
            <Input value={card.label} name="label" onChange={handleChange} />
          </FormControl>
          {/* {renderField()} */}
          <FormControl variant="floating" id="first-name">
            <FormLabel>Description</FormLabel>
            <Textarea
              value={card.description}
              name="description"
              onChange={handleChange}
            />
          </FormControl>
        </Stack>
      </ModalWindow>
    </Box>
  )
}

export default Card
