import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginScreen from './screens/Login'
import RegisterScreen from './screens/Register'
import Home from './screens/Home'
import EditProfile from './screens/EditProfile'
import Columns from './screens/Columns'
import Cards from './screens/Cards'
import Statistic from './screens/Statistic'
import ProtectedRoute from '@components/ProtectedRoute'
import AuthLayout from '@components/AuthLayout'

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      element: <AuthLayout />,
      children: [
        {
          path: '/',
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          )
        },
        {
          path: '/edit-profile',
          element: (
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          )
        },
        {
          path: '/columns',
          element: (
            <ProtectedRoute>
              <Columns />
            </ProtectedRoute>
          )
        },
        {
          path: '/statistic',
          element: (
            <ProtectedRoute>
              <Statistic />
            </ProtectedRoute>
          )
        },
        {
          path: '/cards',
          element: (
            <ProtectedRoute>
              <Cards />
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
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
