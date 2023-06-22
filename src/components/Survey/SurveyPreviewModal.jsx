import { Close } from '@mui/icons-material'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  Radio,
  NativeSelect as Select,
  Stack,
  TextField,
  Typography,
  IconButton,
} from '@mui/material'
import * as React from 'react'
import XStack from '../XStack'

const formInputTypeMap = {
  textField: (props) => (
    <div>
      <TextField {...props} label={undefined} placeholder="Type here..." />
    </div>
  ),
  checkBox: (props) => (
    <FormControlLabel
      sx={{ display: 'block', marginBottom: 1 }}
      control={<Checkbox name={props.name} value={props.label} />}
      label={props.label}
      {...props}
    />
  ),
  radioButton: (props) => (
    <FormControlLabel
      sx={{ display: 'block', marginBottom: 1 }}
      control={
        <input style={{ marginInline: '.8rem' }} type="radio" {...props} value={props.label} />
      }
      label={props.label}
      {...props}
    />
  ),
  select: ({ label, ...props }) => {
    let options = label
      .split(',')
      .filter(Boolean)
      .map((x) => x.trim())

    return (
      <TextField
        select
        {...props}
        label={undefined}
        SelectProps={{
          native: true,
          defaultValue: 'heyo',
        }}
      >
        <option hidden value="">
          Choose one below:
        </option>
        {options.map((optionValue) => (
          <option value={optionValue} key={optionValue}>
            {optionValue}
          </option>
        ))}
      </TextField>
    )
  },
}

export default function SurveyPreview({ style, surveyForm, open, onClose, ...props }) {
  const [formSubmission, setFormSubmission] = React.useState(() =>
    Array.from(surveyForm).map((input) => ({
      question: input.question,
      id: input.id,
      value: input.formInputName === 'checkBox' ? [] : '',
      required: input.required,
    }))
  )

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        sx={{
          position: 'absolute',
          inset: 0,
          marginInline: 'auto',
          marginBlock: 4,
          padding: 2,
          borderRadius: 1,
          maxWidth: '700px',
          backgroundColor: 'whitesmoke',
          overflowY: 'auto',
        }}
        onSubmit={handleSubmit()}
      >
        <XStack justifyContent="flex-end">
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </XStack>

        {surveyForm.map((formInput, i) => (
          <Box key={formInput.id} sx={{ marginBottom: 5 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              {i + 1}. {formInput.question}
              {formInput.required && ' *'}
            </Typography>

            {formInput.children.map((child, child_i) => {
              const InputControl = formInputTypeMap[child.type]

              return (
                <InputControl
                  name={formInput.id}
                  key={child_i}
                  {...child.props}
                  value={formSubmission[i].value}
                  checked={
                    child.type === 'checkBox'
                      ? formSubmission[i].value.includes(child.props.label)
                      : formSubmission[i].value === child.props.label
                  }
                  onChange={(ev) => {
                    setFormSubmission((prev) => {
                      const input = ev.target
                      if (input.type === 'checkbox') {
                        if (input.checked) prev[i].value.push(input.value)
                        else prev[i].value = prev[i].value.filter((value) => value !== input.value)
                      } else {
                        prev[i].value = input.value
                      }

                      return [...prev]
                    })
                  }}
                />
              )
            })}

            {formSubmission[i].error && (
              <Typography variant="body2" color="red">
                {formSubmission[i].error}
              </Typography>
            )}
          </Box>
        ))}

        <Stack direction="row" spacing={1}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Box>
    </Modal>
  )

  function validateFormSubmission() {
    let isValid = true
    formSubmission.forEach((inputControl, i) => {
      if (inputControl.required === true && inputControl.value.toString() === '') isValid = false
      setFormSubmission((prev) => {
        prev[i].error = 'Field is required'
        return [...prev]
      })
    })

    return isValid
  }

  function handleSubmit() {
    return (ev) => {
      ev.preventDefault()
      setFormSubmission((prev) => {
        return prev.map(({ error, ...rest }) => rest)
      })
      try {
        formSubmission.forEach((inputControl, i) => {
          if (inputControl.required === true && inputControl.value.toString() === '')
            setFormSubmission((prev) => {
              prev[i].error = 'Field is required'
              return [...prev]
            })
        })
        console.log(JSON.stringify(formSubmission, null, 4))
      } catch (error) {
        console.log(error)
      }
    }
  }
}
