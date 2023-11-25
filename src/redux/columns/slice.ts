import { createSlice } from '@reduxjs/toolkit'
import type { ColumnsStateT } from './types'
import { StatusE } from '@store/desk/types'
import { fetchColumns } from './asyncActions'

const initialState: ColumnsStateT = {
  columns: [],
  status: StatusE.LOADING
}

export const slice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    // removeColumn: (state, id: PayloadAction<string>) => {
    //    state.user = action.payload
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchColumns.fulfilled, (state, action) => {
      state.columns = action.payload
      state.status = StatusE.SUCCESS
    })
  }
})

export const { removeColumn } = slice.actions

export default slice.reducer
