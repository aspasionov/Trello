import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAll, deleteOne, addOne, updateOne } from '@api/columns.api'
import {
  addOne as addOneCard,
  deleteOne as deleteOneCard,
  updateOne as updateOneCard
} from '@api/cards.api'
import uniqid from 'uniqid'

import type { ColumnT, CardT } from './types'

export const fetchColumns = createAsyncThunk(
  'column/fetchColumns',
  async () => {
    const response = await fetchAll()
    const dataWithId = response.data.map((el: ColumnT) => ({
      ...el,
      id: uniqid(),
      dbId: el.id
    }))
    return dataWithId
  }
)

export const deleteColumn = createAsyncThunk(
  'desk/deleteColumn',
  async (id: string) => {
    const response = await deleteOne(id)
    return response.data.id
  }
)

export const addColumn = createAsyncThunk(
  'desk/addColumn',
  async (column: ColumnT) => {
    const response = await addOne(column)
    return response
  }
)

export const updateColumn = createAsyncThunk(
  'desk/updateColumn',
  async (column: ColumnT) => {
    const response = await updateOne(column.dbId, column)
    return response.data
  }
)

export const addCard = createAsyncThunk('desk/addCard', async (card: CardT) => {
  const response = await addOneCard(card)
  return response
})

export const deleteCard = createAsyncThunk(
  'desk/deleteCard',
  async (id: string) => {
    const response = await deleteOneCard(id)
    return response.data.id
  }
)

export const updateCard = createAsyncThunk(
  'desk/updateCard',
  async (card: CardT) => {
    const response = await updateOneCard(card.id, card)
    return response.data
  }
)
