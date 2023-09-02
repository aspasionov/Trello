import React, { useState } from 'react'
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons'
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

const Card: React.FC<CardProps & { columnId: string }> = (props) => {
  const { id, title, label, description, index } = props
  const [modalOpen, setModalOpen] = useState(false)
  const [card, setCard] = useState<Partial<CardT>>({
    id,
    order: index,
    title: title ?? '',
    label: label ?? '',
    columnId: props.columnId,
    description: description ?? ''
  })

  const dispatch = useAppDispatch()

  const handleEdit = (): void => {
    setModalOpen(true)
  }

  const onSubmit = async (): Promise<void> => {
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

  const handleDelete = async (): Promise<void> => {
    await dispatch(deleteCard(id))
    await dispatch(fetchColumns())
  }

  return (
    <Box p={2} mb={1} bg="white" maxWidth={250} rounded="md">
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
