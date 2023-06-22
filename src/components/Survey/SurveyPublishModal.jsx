import { Close } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  Checkbox,
  IconButton,
  ListItemText,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import * as React from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { fetchSurvey } from '../../redux/surveyAction'
import TopLoadingBar from '../TopLoadingBar'
import XStack from '../XStack'

export default function SurveyPublishModal({ open, onClose, handleChange, ...props }) {
  const [params] = useSearchParams()
  const survey = useSelector((store) => store.survey)
  const surveyId = params.get('id')
  const surveyInfo = survey.list.find((x) => x.id === surveyId)
  const [loading, setLoading] = React.useState(Boolean(surveyInfo))
  const [visibleTo, setVisibleTo] = React.useState([])
  const users = [
    {
      id: 1,
      name: 'John',
    },
    {
      id: 2,
      name: 'Alice',
    },
    {
      id: 3,
      name: 'Bob',
    },
  ]

  React.useEffect(() => {
    ;(async () => {
      if (!surveyId) return
      if (survey.list.length == 0 || surveyInfo == null) {
        setLoading(true)
        await fetchSurvey()
        setLoading(false)
      }
    })()
  }, [])

  function handleChange(ev) {
    const value = ev.target.value
    const isAllSelected = value.find((x) => Array.isArray(x))
    if (isAllSelected) {
      setVisibleTo((prev) => {
        const newValue = prev.length === users.length ? [] : users.map((user) => user.id)
        return newValue
      })
      return
    }

    setVisibleTo(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Card
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          py: 2,
          px: 3,
          width: 'min(100%, 700px)',
        }}
      >
        <XStack justifyContent="space-between">
          <Typography variant="h6">Publish Survey</Typography>

          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </XStack>
        <TopLoadingBar loading={loading} />

        {!surveyId || surveyInfo == null ? (
          <Typography
            variant="h5"
            sx={{
              py: 4,
              color: 'gray',
              textAlign: 'center',
              opacity: 0.5,
              textTransform: 'capitalize',
            }}
          >
            the survey does not exists.
          </Typography>
        ) : (
          <Box component="form" mt={4}>
            <Typography variant="h6">Title: {surveyInfo.title}</Typography>
            <Typography variant="h6" component="pre">
              Description: {surveyInfo.title}
            </Typography>

            <TextField
              label="Select Users"
              SelectProps={{
                multiple: true,
                renderValue: (selected) => {
                  if (selected.length === 0) return <em>Select below</em>
                  return users
                    .filter((user) => selected.includes(user.id))
                    .map((user) => user.name)
                    .join(', ')
                },
              }}
              sx={{ mt: 4 }}
              fullWidth
              select
              value={visibleTo}
              onChange={handleChange}
            >
              <MenuItem disabled value="">
                <em>Select below</em>
              </MenuItem>
              <MenuItem value={users}>
                <Checkbox checked={visibleTo.length === users.length} />
                <ListItemText primary={<em>All Users</em>} />
              </MenuItem>
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  <Checkbox checked={visibleTo.indexOf(user.id) > -1} />
                  <ListItemText primary={user.name} />
                </MenuItem>
              ))}
            </TextField>

            <XStack mt={4}>
              <Button type="submit">Publish</Button>
            </XStack>
          </Box>
        )}
      </Card>
    </Modal>
  )
}
