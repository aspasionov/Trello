import React from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from '@store/store'
import { Provider } from 'react-redux'

import Home from './screens/Home'
import './styles.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  }
])

const appRouting = (
  <Provider store={store}>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </Provider>
)

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(appRouting)
