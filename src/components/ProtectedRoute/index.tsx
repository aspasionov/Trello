import React from 'react'
import { Navigate } from 'react-router-dom'
import { selectUser } from '@store/user/selectors'
import { useSelector } from 'react-redux'

interface RouterProps {
  children: React.ReactElement
}

const ProtectedRoute: React.FC<RouterProps> = ({ children }) => {
  const user = useSelector(selectUser)

  if (user._id === undefined) {
    return <Navigate to="login" replace />
  }

  return children
}

export default ProtectedRoute
