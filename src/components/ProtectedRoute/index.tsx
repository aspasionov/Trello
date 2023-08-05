import React from 'react'
import { Navigate } from 'react-router-dom'


interface RouterProps {
  isAuth: boolean
  children: React.ReactElement
}

const ProtectedRoute: React.FC<RouterProps> = ({ isAuth, children }) => {
  if (!isAuth) {
    return <Navigate to="login" replace />
  }

  return children
}

export default ProtectedRoute

