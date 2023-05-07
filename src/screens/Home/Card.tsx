import React, { useState } from 'react'
import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Flex, Input, Text, Heading, IconButton } from '@chakra-ui/react'
import { useAppDispatch } from '@store/store'
import { updateCard, deleteCard } from '@store/cards/asyncActions'
import type { CardProps } from 'react-trello-ts/dist/components/Card'
import type { CardT } from '@store/cards/types'

interface EditableI {
  title: boolean
  label: boolean
  description: boolean
}

const defaultState = {
  title: false,
  label: false,
  description: false
}

const Card: React.FC<CardProps & { columnId: string }> = (props) => {
  const { id, title, label, description } = props
  const [editable, setEditable] = useState<EditableI>(defaultState)
  const [card, setCard] = useState<CardT>({
    id,
    title: title ?? '',
    label: label ?? '',
    columnId: props.columnId,
    description: description ?? ''
  })

  const dispatch = useAppDispatch()

  const toggleEdit = async (
    key: keyof EditableI,
    isBlurEvent: boolean = false
  ): Promise<any> => {
    setEditable((prev) => ({ ...prev, [key]: !prev[key] }))
    if (isBlurEvent) await dispatch(updateCard(card))
  }

  const handleChange = ({
    target: { name, value }
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setCard((prev) => ({ ...prev, [name]: value }))
  }

  const handleDelete = async (): Promise<void> => {
    await dispatch(deleteCard(card.id))
  }

  return (
    <Box p={2} mb={1} bg="white" maxWidth={250} rounded="md">
      <Flex align="center" justify="space-between">
        {editable.title ? (
          <Input
            value={card.title}
            name="title"
            onChange={handleChange}
            flexGrow={0}
            flexShrink={0}
            autoFocus
            onBlur={() => {
              void (async () => {
                await toggleEdit('title', true)
              })()
            }}
            w="43%"
            placeholder="Title"
            size="xs"
          />
        ) : (
          <Heading
            as="h6"
            size="xs"
            flexGrow={0}
            textOverflow="ellipsis"
            overflow="hidden"
            w="43%"
            flexShrink={0}
            onClick={() => {
              void (async () => {
                await toggleEdit('title')
              })()
            }}
          >
            {card.title === '' ? (
              <Text color="#ccc">Edit title</Text>
            ) : (
              card.title
            )}
          </Heading>
        )}
        {editable.label ? (
          <Input
            value={card.label}
            name="label"
            onChange={handleChange}
            flexGrow={0}
            flexShrink={0}
            autoFocus
            onBlur={() => {
              void (async () => {
                await toggleEdit('label', true)
              })()
            }}
            w="43%"
            placeholder="Label"
            size="xs"
          />
        ) : (
          <Heading
            as="h6"
            size="xs"
            flexGrow={0}
            textOverflow="ellipsis"
            overflow="hidden"
            w="43%"
            flexShrink={0}
            onClick={() => {
              void (async () => {
                await toggleEdit('label')
              })()
            }}
          >
            {card.label === '' ? (
              <Text color="#ccc">Edit label</Text>
            ) : (
              card.label
            )}
          </Heading>
        )}
      </Flex>

      <Flex mt={1} align="center" justify="space-between">
        {editable.description ? (
          <Input
            value={card.description}
            name="description"
            onChange={handleChange}
            flexGrow={1}
            autoFocus
            onBlur={() => {
              void (async () => {
                await toggleEdit('description', true)
              })()
            }}
            placeholder="Description"
            size="xs"
          />
        ) : (
          <Heading
            as="h6"
            size="sm"
            flexGrow={1}
            textOverflow="ellipsis"
            overflow="hidden"
            w="90%"
            flexShrink={0}
            onClick={() => {
              void (async () => {
                await toggleEdit('description')
              })()
            }}
          >
            {card.description === '' ? (
              <Text color="#ccc">Edit description</Text>
            ) : (
              card.description
            )}
          </Heading>
        )}
        <Box w="10%" sx={{ flex: '0 0 auto' }} flexGrow={0}>
          <IconButton
            aria-label="Delete task"
            onClick={() => {
              void (async () => {
                await handleDelete()
              })()
            }}
            colorScheme="red"
            icon={<DeleteIcon />}
            size="xs"
          />
        </Box>
      </Flex>
    </Box>
  )
}

export default Card
