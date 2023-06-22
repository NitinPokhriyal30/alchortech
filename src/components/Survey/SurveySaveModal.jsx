import { Close } from '@mui/icons-material'
import { Modal, Box, Typography, IconButton, TextField, Button, Card, Stack } from '@mui/material'
import * as React from 'react'
import XStack from '../XStack'
import TopLoadingBar from '../TopLoadingBar'
import { editSurvey } from '../../redux/surveyAction'
import { useSearchParams } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'

const initialFormState = { title: '', description: '' }
export default function SurveySaveModal({ open, onClose, surveyForm, ...props }) {
  const survey = useSelector((store) => store.survey)
  const [loading, setLoading] = React.useState('')
  const [form, setForm] = React.useState(initialFormState)
  const [error, setError] = React.useState({})
  const [params] = useSearchParams()
  const surveyId = params.get('id')
  const surveyList = survey.list

  async function handleSubmit(ev) {
    ev.preventDefault()

    try {
      setError({})
      // validate
      let isValid = true
      Object.entries(form)
        .filter(([, value]) => !value)
        .forEach(([name, value]) => {
          console.log(name, value)
          setError((error) => ({ ...error, [name]: 'This field is required' }))
          isValid = false
        })

      if (!isValid) return

      let surveyChanges = form
      surveyChanges.form = surveyForm
      console.log('saving', surveyChanges)
      setLoading('SAVE_SURVEY')
      await editSurvey(surveyId, surveyChanges)
      setLoading('')
    } catch (error) {
      if (error.isAxiosError) {
        setError({ saveBtn: error.message })
      }
      console.log(error)
      setLoading('')
    }
  }

  function inputProps(name) {
    return {
      name,
      onChange(ev) {
        setForm((prev) => {
          prev[name] = ev.target.value
          return { ...prev }
        })
      },
      value: form[name],
    }
  }

  React.useEffect(() => {
    const survey = surveyList.find((x) => x.id === surveyId)
    console.log('survey: ', survey)
    if (survey)
      setForm({
        title: survey.title,
        description: survey.description,
      })
  }, [])

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
        <XStack alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Save Survey</Typography>

          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </XStack>
        <TopLoadingBar loading={loading === 'SAVE_SURVEY'} />

        <Stack mt={2} gap={2} component="form" onSubmit={handleSubmit}>
          <TextField
            {...inputProps('title')}
            label="Title"
            InputLabelProps={{ shrink: true }}
            error={error.title}
            helperText={error.title}
          />

          <TextField
            {...inputProps('description')}
            label="Description"
            error={error.description}
            helperText={error.description}
            multiline
            minRows={3}
            maxRows={4}
            InputLabelProps={{ shrink: true }}
          />

          <Box>
            <Button type="submit">Save</Button>
          </Box>
        </Stack>
      </Card>
    </Modal>
  )
}
