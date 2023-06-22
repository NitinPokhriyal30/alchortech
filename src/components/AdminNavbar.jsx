import { AppBar, Box, Typography } from '@mui/material'
import * as React from 'react'
import { Link } from 'react-router-dom'

export default function AdminNavbar({ title, to }) {
  return (
    <AppBar sx={{ height: 75, justifyContent: 'center', p: 4 }} position="sticky">
      <Link to={to} style={{ color: 'inherit', width: 'fit-content' }}>
        <Typography variant="h5">{title}</Typography>
      </Link>
    </AppBar>
  )
}
