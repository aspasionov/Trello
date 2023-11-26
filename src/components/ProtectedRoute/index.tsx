import React from 'react'
import { Navigate } from 'react-router-dom'
import { selectUser } from '@store/user/selectors'
import { useSelector } from 'react-redux'
import Header from '@components/Header'

interface RouterProps {
  children: React.ReactElement
}

const ProtectedRoute: React.FC<RouterProps> = ({ children }) => {
  const user = useSelector(selectUser)

  if (user.isAuth === false) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default ProtectedRoute
