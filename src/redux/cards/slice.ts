import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CardT, CardI } from './types'
import { StatusE } from '../columns/types'
import { fetchCards, deleteCard, addCard, updateCard } from './asyncActions'

const initialState: CardI = {
  cards: [],
  status: StatusE.LOADING
}

export const columnsSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<CardT[]>) => {
      state.cards = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.cards = action.payload
        state.status = StatusE.SUCCESS
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.cards = []
        state.status = StatusE.ERROR
      })
      .addCase(fetchCards.pending, (state, action) => {
        state.cards = []
        state.status = StatusE.LOADING
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        const prevCards = state.cards.filter((card) => card.id !== action.payload)
        state.cards = prevCards
        state.status = StatusE.SUCCESS
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        const { id } = action.payload
        const prevCards = state.cards.filter((card) => card.id !== id)
        state.cards = [...prevCards, action.payload]
        state.status = StatusE.SUCCESS
      })
      .addCase(addCard.fulfilled, (state, action) => {
        const column = action.payload
        state.cards.push(column)
        state.status = StatusE.SUCCESS
      })
  }
})

export const { setCards } = columnsSlice.actions

export default columnsSlice.reducer
