import * as React from 'react'
import Button from '@mui/material/Button'

export default function SingleComponentTestPage({ ...props }) {
  const [show, setShow] = React.useState(false)

  return (
    <div>
      <Button onClick={() => setShow(true)}>Show</Button>

    </div>
  )
}
