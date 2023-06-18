import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAll, deleteOne, addOne, updateOne } from '@api/columns.api'
import uniqid from 'uniqid'

import type { ColumnT } from './types'

export const fetchColumns = createAsyncThunk(
  'column/fetchColumns',
  async () => {
    const response = await fetchAll()
    const dataWithId = response.data.map((el: ColumnT) => ({
      ...el,
      id: uniqid(),
      dbId: el.id
    }))
    return dataWithId
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

export const updateColumn = createAsyncThunk(
  'column/updateColumn',
  async (column: ColumnT) => {
    const response = await updateOne(column.dbId, column)
    return response.data
  }
)
