import { createSlice, current } from '@reduxjs/toolkit'
import type { CardT } from '../cards/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { UserT, UserStateT } from './types'
import { StatusE } from './types'
import { getCurrentUser, login, register } from './asyncActions'

const initialState: UserStateT = {
  user: null,
  status: StatusE.LOADING
}

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserT>) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.status = StatusE.SUCCESS
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = StatusE.ERROR
        state.user = action.payload as UserT
      })
      .addCase(login.rejected, (state, action) => {
        state.status = StatusE.ERROR
        state.user = { isAuth: false }
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = StatusE.ERROR
        state.user = action.payload as UserT
      })
      .addCase(register.rejected, (state, action) => {
        state.status = StatusE.ERROR
        console.log('xxx', action.payload)
        state.user = { isAuth: false }
      })
  }
})

export const { setUser } = slice.actions

export default slice.reducer
