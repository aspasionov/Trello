import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAll, deleteOne, addOne, updateOne } from '@api/columns.api'

import {
  addOne as addOneCard,
  deleteOne as deleteOneCard,
  updateOne as updateOneCard
} from '@api/cards.api'

import type { ColumnT, CardT } from './types'

export const fetchColumns = createAsyncThunk(
  'column/fetchColumns',
  async () => {
    const response = await fetchAll()
    return response.data
  }
)

export const deleteColumn = createAsyncThunk(
  'desk/deleteColumn',
  async (id: string) => {
    const response = await deleteOne(id)
    return response.message
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
    const response = await updateOne(column.id, column)
    return response
  }
)

export const addCard = createAsyncThunk('desk/addCard', async (card: CardT, { rejectWithValue }) => {
  try {
    const response = await addOneCard(card)
    return response
  } catch(err) {
    return rejectWithValue(err.response.data)
  }
})

export const deleteCard = createAsyncThunk(
  'desk/deleteCard',
  async (id: string) => {
    const response = await deleteOneCard(id)
    return response.message
  }
)

export const updateCard = createAsyncThunk(
  'desk/updateCard',
  async (card: CardT) => {
    const response = await updateOneCard(card.id, card)
    return response
  }
)
