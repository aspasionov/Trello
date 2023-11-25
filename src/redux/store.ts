import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import desk from './desk/slice'
import user from './user/slice'
import columns from './columns/slice'
import users from './users/slice'

export const store = configureStore({
  reducer: { desk, user, columns, users },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
