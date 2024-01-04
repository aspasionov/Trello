import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ColumnT } from '@store/desk/types'
import type { ColumnsStateT } from './types'
import { StatusE } from '@store/desk/types'
import { fetchColumns } from './asyncActions'

const initialState: ColumnsStateT = {
  columns: [],
  totalCount: 0,
  status: StatusE.LOADING
}

export const slice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    addColumns: (state, action: PayloadAction<ColumnT[]>) => {
      state.columns = [...state.columns, ...action.payload]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchColumns.fulfilled, (state, action) => {
      state.columns = action.payload.data as ColumnT[]
      state.totalCount = action.payload.meta['total_count']
      state.status = StatusE.SUCCESS
    })
  }
})

export const { addColumns } = slice.actions

export default slice.reducer
