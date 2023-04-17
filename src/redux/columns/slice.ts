import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ColumnT, ColumnI } from './types'
import { StatusE } from './types'
import { fetchData, deleteColumn } from './asyncActions'

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
      .addCase(fetchData.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = StatusE.SUCCESS
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.items = []
        state.status = StatusE.ERROR
      })
      .addCase(fetchData.pending, (state, action) => {
        state.items = []
        state.status = StatusE.LOADING
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        const { id } = action.payload
        const prevColumns = state.items.filter(column => column.id !== id)
        state.items = prevColumns
        state.status = StatusE.SUCCESS
      })
  }
})

export const { setColumns } = columnsSlice.actions

export default columnsSlice.reducer
