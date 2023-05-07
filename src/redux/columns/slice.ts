import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ColumnT, ColumnI } from './types'
import { StatusE } from './types'
import { deleteColumn, addColumn, fetchColumns } from './asyncActions'

const initialState: ColumnI = {
  items: [],
  status: StatusE.LOADING
}

export const columnsSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setColumns: (state, action: PayloadAction<ColumnT[]>) => {
      state.items = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = StatusE.SUCCESS
      })
      .addCase(fetchColumns.rejected, (state, action) => {
        state.items = []
        state.status = StatusE.ERROR
      })
      .addCase(fetchColumns.pending, (state, action) => {
        state.items = []
        state.status = StatusE.LOADING
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        const prevColumns = state.items.filter((column) => column.id !== action.payload)
        state.items = prevColumns
        state.status = StatusE.SUCCESS
      })
      .addCase(addColumn.fulfilled, (state, action) => {
        state.items.push(action.payload)
        state.status = StatusE.SUCCESS
      })
  }
})

export const { setColumns } = columnsSlice.actions

export default columnsSlice.reducer
