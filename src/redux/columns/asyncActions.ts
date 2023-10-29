import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllColumns } from '@api/adminRoutes.api'
import type { ColumnT } from '@store/desk/types'

export const fetchColumns = createAsyncThunk(
  'column/fetchColumns',
  async () => {
    const response = await fetchAllColumns()
    return response.data as ColumnT[]
  }
)
