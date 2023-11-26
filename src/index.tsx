import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

import App from './App'
import { store } from '@store/store'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'

const appRouting = (
  <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Provider>
)

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(appRouting)
