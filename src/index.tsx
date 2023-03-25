import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import App from './App'
import './styles.css'

const appRouting = (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </Router>
)

ReactDOM.render(appRouting, document.getElementById('root'))
