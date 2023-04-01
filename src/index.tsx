import React from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import App from './App'
import Home from './screens/Home'
import './styles.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  }
])

const appRouting = (
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
)

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(appRouting)
