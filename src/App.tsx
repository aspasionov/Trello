import React, { useEffect } from 'react'
import instance from '@api/base.api'
import { useAppDispatch } from '@store/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginScreen from './screens/Login'
import RegisterScreen from './screens/Register'
import Home from './screens/Home'
import { getCurrentUser } from '@store/user/asyncActions'
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
        <ProtectedRoute isAuth={user?.isAuth !== undefined}>
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
      if (true) {
        instance.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGI5N2U0NzZjZDlmMDJjYzcxYWFhN2IiLCJpYXQiOjE2ODk4NzkxMzIsImV4cCI6MTY5MjQ3MTEzMn0.libVbfttCuWnrF3SWZ61uUVh_XXEnd8gh80MSqsbhrQ`
        try {
          await dispatch(getCurrentUser())
        } catch (err) {
          console.error(err)
        }
      }
    })()
  }, [])

  if(!user) {
    return <Preloader/>
  }

  return <RouterProvider router={router} />
}

export default App
