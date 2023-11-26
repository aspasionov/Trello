import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ColumnT, ColumnI } from './types'
import { StatusE } from './types'
import { errorsToString } from '@utils/errorsToString'
import {
  deleteColumn,
  addColumn,
  fetchColumns,
  updateColumn,
  addCard,
  deleteCard,
  updateCard
} from './asyncActions'
import { createStandaloneToast } from '@chakra-ui/react'

const { toast } = createStandaloneToast()


const initialState: ColumnI = {
  items: [],
  status: StatusE.LOADING
}

export const deskSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setColumns: (state, action: PayloadAction<ColumnT[]>) => {
      state.items = action.payload.sort((a, b) => a.order - b.order)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = StatusE.SUCCESS
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        const prevColumns = state.items.filter(
          (column) => column.id !== action.payload
        )
        state.items = prevColumns
        state.status = StatusE.SUCCESS
      })
      .addCase(addColumn.fulfilled, (state, action) => {
        state.items.push(action.payload)
        state.status = StatusE.SUCCESS
      })
      .addCase(updateColumn.fulfilled, (state) => {
        state.status = StatusE.SUCCESS
      })
      .addCase(addCard.fulfilled, (state) => {
        state.status = StatusE.SUCCESS
      })
      .addCase(addCard.rejected, (state, action) => {
        state.status = StatusE.SUCCESS
        toast({
          title: 'An error occurred.',
          description: errorsToString(action.payload.errors),
          status: 'error',
          position: 'bottom-left',
          duration: 6000,
          isClosable: true,
        })
      })
      .addCase(deleteCard.fulfilled, (state) => {
        state.status = StatusE.SUCCESS
      })
      .addCase(updateCard.fulfilled, (state) => {
        state.status = StatusE.SUCCESS
      })
  }
})

export const { setColumns } = deskSlice.actions

export default deskSlice.reducer
