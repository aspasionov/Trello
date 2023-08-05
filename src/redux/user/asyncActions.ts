import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUser, loginUser, registerUser } from '@api/user.api'
import type { UserT } from './types'

export const getCurrentUser = createAsyncThunk('auth/me', async () => {
  const response = await getUser()
  return { ...response, isAuth: true }
})

export const login = createAsyncThunk(
  'auth/login',
  async (data: UserT, { rejectWithValue }) => {
    try {
      const response = await loginUser(data)
      return response
    } catch (err) {
      if (err instanceof Error) {
        throw err
      }
      if (typeof err === 'object' && err !== null && 'errors' in err) {
        return rejectWithValue(err.errors as Array<Record<string, string>>)
      }
      return 'Something went wrong'
    }
})

export const register = createAsyncThunk(
  'auth/register',
  async (data: UserT, { rejectWithValue }) => {
    try {
      const response = await registerUser(data)
      return response
    } catch (err) {
      if (err instanceof Error) {
        throw err
      }
      if (typeof err === 'object' && err !== null && 'errors' in err) {
        return rejectWithValue(err.errors as Array<Record<string, string>>)
      }
    }
  }
)
