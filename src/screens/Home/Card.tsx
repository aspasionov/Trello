import React, { useState } from 'react'
import { ChevronDownIcon, HamburgerIcon, DownloadIcon } from '@chakra-ui/icons'
import { addBackground, getOneCard } from '@api/cards.api'
import { renderImgPath } from '@utils/imgPath'

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
  Avatar,
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
  const [card, setCard] = useState<Partial<CardT>>({
    id,
    order: index,
    title: title ?? '',
    label: label ?? '',
    columnId: props.columnId,
    description: description ?? '',
    background: background ?? null
  })

  const dispatch = useAppDispatch()

  const handleEdit = (): void => {
    setModalOpen(true)
  }

  const onSubmit = async (): Promise<void> => {
    console.log('card', card)
    await dispatch(updateCard(card as CardT))
    await dispatch(fetchColumns())
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

  const handleUploadFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const formData = new FormData()

    if (event.currentTarget.files == null) return

    formData.append('background', event.currentTarget.files[0])

    await addBackground(card.id as string, formData)
    try {
      const cardData = await getOneCard(card.id as string)
      setCard(cardData)
    } catch (e) {
      console.log(e)
    }
  }

  const handleDelete = async (): Promise<void> => {
    await dispatch(deleteCard(id))
    await dispatch(fetchColumns())
  }
  const bgImg: string = renderImgPath(card.background as string)
  const cardStyles = {
    p: 2,
    mb: 1,
    maxWidth: 250,
    rounded: 'md',
    bg:
      card.background !== null
        ? `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${bgImg}) center/cover no-repeat`
        : 'white',
    ...(card.background !== null && {
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
          <FormControl variant="floating">
            <Stack direction="row" spacing={4} alignItems="center">
              <label htmlFor="inputFile">
                <input
                  id="inputFile"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    void (async () => {
                      await handleUploadFile(e)
                    })()
                  }}
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
              <Avatar
                size="2xl"
                src={renderImgPath(card.background as string)}
              />
            </Stack>
            <FormLabel>Background</FormLabel>
          </FormControl>
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
