import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import column from './columns/slice'

export const store = configureStore({
  reducer: { column }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
