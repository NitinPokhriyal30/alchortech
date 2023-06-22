import { Close } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  FormHelperText,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import * as React from 'react'
import { createSurvey } from '../../redux/surveyAction'

export default function SurveyCreateModal({ open, onClose }) {
  const initSurveyInfoState = { title: '', description: '' }
  const initErrorState = { title: '', description: '', createBtn: '' }

  const [loading, setLoading] = React.useState('')
  const [errors, setErrors] = React.useState(initErrorState)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [surveyInfo, setSurveyInfo] = React.useState(initSurveyInfoState)

  function validateSubmission() {
    setErrors(initErrorState)
    let isValid = true
    Object.entries(surveyInfo).forEach(([key, value]) => {
      if (value === '') {
        isValid = false
        setErrors((prev) => ({ ...prev, [key]: 'This field is required' }))
      }
    })

    return isValid
  }

  function validateSubmission() {
    setErrors(initErrorState)
    let isValid = true
    Object.entries(surveyInfo).forEach(([key, value]) => {
      if (value === '') {
        isValid = false
        setErrors((prev) => ({ ...prev, [key]: 'This field is required' }))
      }
    })

    return isValid
  }

  async function handleCreate(ev) {
    try {
      ev.preventDefault()

      if (!validateSubmission()) return

      setLoading('saving_survey')
      setIsSuccess(false)
      surveyInfo.form = []
      await createSurvey(surveyInfo)

      //reset states
      setIsSuccess(true)
      setSurveyInfo(initSurveyInfoState)
      setIsSuccess(false)
      setErrors(initErrorState)

      setTimeout(() => {
        onClose()
      }, 300)
    } catch (error) {
      if (error.isAxiosError) {
        setErrors((prev) => ({ ...prev, createBtn: 'Failed to create survey' }))
      }

      console.log('SurveyCreatePage.handlePublish():', error)
    } finally {
      setLoading('')
    }
  }

  console.log(errors)
  function inputProps(name) {
    return {
      name,
      onChange(ev) {
        setSurveyInfo((prev) => {
          prev[name] = ev.target.value
          return { ...prev }
        })
      },
      value: surveyInfo[name],
      // using helper text always for errors
      error: true,
      helperText: errors[name],
    }
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Publish Survey</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <Stack mt={2} gap={2} component="form" onSubmit={handleCreate}>
          <TextField
            InputLabelProps={{ shrink: true }}
            label="Survey Title"
            {...inputProps('title')}
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            name="description"
            label="Description"
            multiline
            minRows={3}
            maxRows={4}
            {...inputProps('description')}
          />

          <Box mt={4}>
            <Button variant="contained" type="submit" disabled={loading === 'saving_survey'}>
              {loading === 'saving_survey' ? 'Create...' : 'Create'}
            </Button>

            <FormHelperText error={true}>{errors.createBtn}</FormHelperText>
          </Box>
        </Stack>
      </Card>
    </Modal>
  )
}
