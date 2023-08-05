import React, { useEffect } from 'react'
import instance from '@api/base.api'
import { useAppDispatch } from '@store/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginScreen from './screens/Login'
import RegisterScreen from './screens/Register'
import Home from './screens/Home'
import { getCurrentUser } from '@store/user/asyncActions'
import { setUser } from '@store/user/slice'
import { useSelector } from 'react-redux'
import { selectUser } from '@store/user/selectors'
import Preloader from '@components/Preloader'
import ProtectedRoute from '@components/ProtectedRoute'

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  const user = useSelector(selectUser)

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute isAuth={user?.isAuth !== false}>
          <Home />
        </ProtectedRoute>
      )
    },
    {
      path: '/login',
      element: <LoginScreen />
    },
    {
      path: '/register',
      element: <RegisterScreen />
    }
  ])

  useEffect(() => {
    void (async () => {
      const token: string | null = localStorage.getItem('TrelloToken')
      if (token !== null) {
        instance.defaults.headers.common.Authorization = `Bearer ${token}`
        try {
          await dispatch(getCurrentUser())
        } catch (err) {
          console.error(err)
        }
      } else {
        dispatch(setUser({ isAuth: false }))
      }
    })()
  }, [])

  if (user === null) {
    return <Preloader />
  }

  return <RouterProvider router={router} />
}

export default App
