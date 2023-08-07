import { api } from '@/api'
import Cookies from 'js-cookie'
import * as React from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const me = useQuery(
    'me',
    async () => api.auth.me(Cookies.get('user_id')).catch(() => ({})),
    { initialData: null }
  )

  if (me.data === null) {
    return 'loading...'
  }

  if (me.data?.id == null) return <Navigate to="/login" replace />

  return children
}
