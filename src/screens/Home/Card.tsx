import React, { useState } from 'react'
import { CloseIcon } from '@chakra-ui/icons'
import { Box, Flex, Input, Text, Heading, IconButton } from '@chakra-ui/react'
import { updateColumn, fetchColumns } from '@store/columns/asyncActions'
import { useAppDispatch } from '@store/store'
import type { CardProps } from 'react-trello-ts/dist/components/Card'
import type { CardT } from '@store/cards/types'
import { useSelector } from 'react-redux'
import { selectColumns } from '@store/columns/selectors'
import type { ColumnT } from '@store/columns/types'

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
  const [card, setCard] = useState<Partial<CardT>>({
    id,
    title: title ?? '',
    label: label ?? '',
    columnId: props.columnId,
    description: description ?? ''
  })

  const dispatch = useAppDispatch()
  const columns = useSelector(selectColumns)

  const toggleEdit = async (
    key: keyof EditableI,
    isBlurEvent: boolean = false
  ): Promise<any> => {
    setEditable((prev) => ({ ...prev, [key]: !prev[key] }))
    if (isBlurEvent) {
      const currentColumn = columns.find((el) => el.id === card.columnId)
      const updatedCurrentColumn: Partial<ColumnT> = {
        ...currentColumn,
        cards:
          currentColumn === undefined
            ? []
            : [
                ...currentColumn.cards.filter((item) => item.id !== card.id),
                card as CardT
              ]
      }
      await dispatch(updateColumn(updatedCurrentColumn as ColumnT))
    }
  }

  const handleChange = ({
    target: { name, value }
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setCard((prev) => {
      return { ...prev, [name]: value, columnId: props.columnId }
    })
  }

  const handleDelete = async (): Promise<void> => {
    const updatedColumn = columns.find((el) => el.dbId === card.columnId)
    const newColumn: Partial<ColumnT> = {
      ...updatedColumn,
      cards:
        updatedColumn === undefined
          ? []
          : updatedColumn.cards.filter((item) => item.id !== card.id)
    }
    await dispatch(updateColumn(newColumn as ColumnT))
    await dispatch(fetchColumns())
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
            icon={<CloseIcon />}
            size="xs"
          />
        </Box>
      </Flex>
    </Box>
  )
}

export default Card
