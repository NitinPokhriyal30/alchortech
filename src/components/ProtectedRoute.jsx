import * as React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const { loggedIn } = useSelector((store) => store.user)

  if (!loggedIn) {
    return <Navigate to="/login" replace />
  }

  return children
}
