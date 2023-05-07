import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAll, deleteOne, addOne } from '@api/columns.api'
import type { ColumnT } from './types'

export const fetchColumns = createAsyncThunk(
  'column/fetchColumns',
  async () => {
    const response = await fetchAll()
    return response.data
  }
)

export const deleteColumn = createAsyncThunk(
  'column/deleteColumn',
  async (id: string) => {
    const response = await deleteOne(id)
    return response.data.id
  }
)

export const addColumn = createAsyncThunk(
  'column/addColumn',
  async (column: ColumnT) => {
    const response = await addOne(column)
    return response.data
  }
)
