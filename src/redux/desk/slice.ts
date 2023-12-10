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
import {alert} from "@utils/toast";



const initialState: ColumnI = {
  items: [],
  columnParams: {},
  status: StatusE.LOADING
}

export const deskSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setColumns: (state, action: PayloadAction<ColumnT[]>) => {
      state.items = action.payload.sort((a, b) => a.order - b.order)
    },
    setParams: (state, action: PayloadAction<Record<string, string>>) => {
      state.columnParams = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = StatusE.SUCCESS
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        alert(action.payload, 'success')
        state.status = StatusE.SUCCESS
      })
      .addCase(addColumn.fulfilled, (state, action) => {
        alert(`Column "${action.payload.title}" successfully created` , 'success')
        state.status = StatusE.SUCCESS
      })
      .addCase(addColumn.rejected, (state) => {
        alert(`Column creation was unsuccessful`)
        state.status = StatusE.ERROR
      })
      .addCase(updateColumn.fulfilled, (state, action) => {
        alert(`Column "${action.payload.title}" successfully updated` , 'success')
        state.status = StatusE.SUCCESS
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.status = StatusE.SUCCESS
        alert(`Card "${action.payload.title}" successfully created` , 'success')
      })
      .addCase(addCard.rejected, (state, action) => {
        state.status = StatusE.ERROR
        alert(errorsToString(action.payload.errors))
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.status = StatusE.SUCCESS
        alert(action.payload, 'success')
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        state.status = StatusE.SUCCESS
        alert(`Card "${action.payload.title}" successfully updated` , 'success')
      })
  }
})

export const { setColumns, setParams } = deskSlice.actions

export default deskSlice.reducer
