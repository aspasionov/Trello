import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import desk from './desk/slice'
import user from './user/slice'

export const store = configureStore({
  reducer: { desk, user },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
