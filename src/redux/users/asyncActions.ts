import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllUsers } from '@api/adminRoutes.api'
import type { UserI } from './types'

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params?: { fields?: keyof UserI }) => {
    const response = await fetchAllUsers(params)
    return response.data
  }
)
