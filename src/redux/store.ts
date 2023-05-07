import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import column from './columns/slice'
import cards from './cards/slice'

export const store = configureStore({
  reducer: { column, cards }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
