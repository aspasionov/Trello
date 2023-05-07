import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAll, updateOne, addOne, deleteOne } from '@api/cards.api'
import type { CardT } from './types'

export const fetchCards = createAsyncThunk(
  'column/fetchCards',
  async () => {
    const response = await fetchAll()
    return response.data
  }
)

export const updateCard = createAsyncThunk(
  'column/updateCard',
  async (card: CardT) => {
    const response = await updateOne(card.id, card)
    return response.data
  }
)

export const addCard = createAsyncThunk(
  'column/addCard',
  async (card: CardT) => {
    const response = await addOne(card)
    return response.data
  }
)

export const deleteCard = createAsyncThunk(
  'column/deleteCard',
  async (id: string) => {
    const response = await deleteOne(id)
    return response.data.id
  }
)
