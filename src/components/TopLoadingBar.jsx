import { Box } from '@mui/material'
import * as React from 'react'

const initialX = 10
export default function TopLoadingBar({ loading, ...props }) {
  const [x, setX] = React.useState(initialX)
  const wasLoading = React.useRef(false)
  const timerId = React.useRef(0)

  React.useEffect(() => {
    if (loading === true && wasLoading.current === false) {
      wasLoading.current = true
      timerId.current = setInterval(() => {
        setX((p) => {
          if (p + 5 > 80) return p

          return p + 5
        })
      }, 500)
    }

    if (wasLoading.current === true && loading === false) {
      wasLoading.current = false
      setX(100)
      setTimeout(() => {
        setX(initialX)
      }, 1000)
      clearInterval(timerId.current)
    }

    return () => clearInterval(timerId.current)
  }, [loading])

  return (
    <Box
      sx={{
        height: 4,
        backgroundColor: 'red',
        position: 'absolute',
        left: '0',
        width: x + '%',
        transition: 'width 500ms linear, opacity 1000ms ease',
        opacity: x === 100 || x === initialX ? 0 : 1,
      }}
    ></Box>
  )
}
