import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginScreen from './screens/Login'
import RegisterScreen from './screens/Register'
import Home from './screens/Home'
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
