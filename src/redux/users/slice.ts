import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { StatusE } from '@store/desk/types'
import type { UserStateT } from './types'
import { fetchUsers } from './asyncActions'

const initialState: UserStateT = {
  users: [],
  status: StatusE.LOADING
}

export const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    removeColumn: (state, id: PayloadAction<string>) => {
      // state.user = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload
      state.status = StatusE.SUCCESS
    })
  }
})

export const { removeColumn } = slice.actions

export default slice.reducer
