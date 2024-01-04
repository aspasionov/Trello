import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllColumns } from '@api/adminRoutes.api'

export const fetchColumns = createAsyncThunk(
  'column/fetchAllColumns',
  async (params) => {
    const response = await fetchAllColumns(params)
    return response
  }
)
