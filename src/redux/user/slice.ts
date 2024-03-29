import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { UserT, UserStateT } from './types'
import { StatusE } from './types'
import { getCurrentUser, login, register, update } from './asyncActions'
import {errorsToString} from "@utils/errorsToString";
import { alert } from '@utils/toast'

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
      state.user = { isAuth: false }
      localStorage.removeItem('TrelloToken')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.status = StatusE.SUCCESS
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.user = action.payload as UserT
        state.status = StatusE.SUCCESS
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = StatusE.SUCCESS
        Object.assign(action.payload, { isAuth: true })
        state.user = action.payload as UserT
      })
      .addCase(login.rejected, (state, action) => {
        state.status = StatusE.ERROR
        state.user = { isAuth: false }
        alert(errorsToString(action.payload))
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = StatusE.SUCCESS
        state.user = action.payload as UserT
      })
      .addCase(register.rejected, (state,action) => {
        state.status = StatusE.ERROR
        state.user = { isAuth: false }
        alert(errorsToString(action.payload))
      })
      .addCase(update.fulfilled, (state, action) => {
        state.status = StatusE.SUCCESS
        state.user = action.payload as UserT
      })
  }
})

export const { setUser, logout } = slice.actions

export default slice.reducer
