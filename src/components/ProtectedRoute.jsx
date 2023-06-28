import * as React from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const me = useQuery("me")

  if (me.data == null) {
    return <Navigate to="/login" replace />
  }

  return children
}
