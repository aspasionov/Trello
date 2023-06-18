import { createSlice, current } from '@reduxjs/toolkit'
import type { CardT } from '../cards/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ColumnT, ColumnI } from './types'
import { StatusE } from './types'
import {
  deleteColumn,
  addColumn,
  fetchColumns,
  updateColumn
} from './asyncActions'

const initialState: ColumnI = {
  items: [],
  status: StatusE.LOADING
}

export const columnsSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setColumns: (state, action: PayloadAction<ColumnT[]>) => {
      state.items = action.payload.sort((a, b) => a.order - b.order)
    },
    addNewColumn: (state, action: PayloadAction<ColumnT>) => {
      state.items.push(action.payload)
    },
    removeColumn: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1)
    },
    removeCard: (state, action: PayloadAction<CardT>) => {
      const updatedColumn = state.items.find(
        (el) => el.id === action.payload.columnId
      )
      const newColumn: Partial<ColumnT> = {
        ...updatedColumn,
        cards:
          updatedColumn === undefined
            ? []
            : updatedColumn.cards.filter(
                (item) => item.id !== action.payload.id
              )
      }
      const updatedColumns = current(state.items).filter(
        (column) => column.id !== action.payload.columnId
      )
      state.items = [...updatedColumns, newColumn] as ColumnT[]
    },
    addNewCard: (state, action: PayloadAction<CardT>) => {
      const newColumn = state.items.find(
        (el) => el.id === action.payload.columnId
      )
      const updatedNewColumn: Partial<ColumnT> = {
        ...newColumn,
        cards:
          newColumn === undefined
            ? []
            : ([...newColumn.cards, action.payload] as CardT[])
      }
      const filteredItems = current(state.items).filter(
        (column) => column.id !== action.payload.columnId
      )
      state.items = [...filteredItems, updatedNewColumn] as ColumnT[]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = StatusE.SUCCESS
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        const prevColumns = state.items.filter(
          (column) => column.id !== action.payload
        )
        state.items = prevColumns
        state.status = StatusE.SUCCESS
      })
      .addCase(addColumn.fulfilled, (state, action) => {
        state.items.push(action.payload)
        state.status = StatusE.SUCCESS
      })
      .addCase(updateColumn.fulfilled, (state, action) => {
        state.status = StatusE.SUCCESS
      })
  }
})

export const { setColumns, removeColumn, addNewColumn } = columnsSlice.actions

export default columnsSlice.reducer
