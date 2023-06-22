import Button from '@mui/material/Button'
import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { formInputTypeMap } from '../pages/SurveryCreatePage'
import TextField from '@mui/material/TextField'
import { Box, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material'

function DraggableFormControl({
  dispatch,
  questionValue,
  inputElements: optionElements,
  index,
  id,
  ...props
}) {
  function handleDeleteFormControl(targetControlId) {
    dispatch((prev) => prev.filter((formControl) => formControl.id !== targetControlId))
  }

  return (
    <Draggable index={index} draggableId={id}>
      {(provided) => (
        <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
          <Box
            sx={{
              backgroundColor: '#efefef',
              borderRadius: 2,
              padding: 2,
              marginBottom: 2,
            }}
          >
            <TextField
              variant="outlined"
              inputProps={{
                style: {
                  color: 'gray',
                },
              }}
              onChange={(ev) =>
                dispatch({
                  action: 'editQuestion',
                  index,
                  value: ev.target.value,
                })
              }
              value={questionValue}
              fullWidth
            />

            <FormControlLabel
              control={<Checkbox />}
              label="Mark as required"
              onChange={(ev) =>
                dispatch({
                  action: 'toggleRequiredInputControl',
                  index,
                  checked: ev.target.checked,
                })
              }
            />

            {props.image && <img src={URL.createObjectURL(props.image)} width="200px" />}

            <Box sx={{ marginTop: 2 }}>
              {optionElements.map((child, child_i) => {
                const InputControl = formInputTypeMap[child.type]

                return (
                  <InputControl
                    key={child_i}
                    name={id}
                    {...child.props}
                    onDelete={() =>
                      dispatch({
                        action: 'removeChildInput',
                        index,
                        targetChild: child,
                      })
                    }
                    onChange={(ev) =>
                      dispatch({
                        action: 'editChildInput',
                        index,
                        targetChild: child,
                        value: ev.target.value,
                      })
                    }
                  />
                )
              })}

              <Stack direction="row" spacing={1} paddingTop="1rem">
                {/radioButton|checkBox/.test(props.formInputName) && (
                  <Button
                    type="button"
                    variant="contained"
                    size="small"
                    onClick={() => {
                      dispatch({
                        action: 'addChildInput',
                        index,
                        type: props.formInputName,
                      })
                    }}
                  >
                    add {optionElements[0].type}
                  </Button>
                )}

                <Button
                  color="warning"
                  onClick={() => dispatch({ action: 'deleteInputControl', inputControlId: id })}
                >
                  Delete
                </Button>
              </Stack>
            </Box>
          </Box>
        </div>
      )}
    </Draggable>
  )
}

const S = {
  formControl: {
    paddingBlock: '.5rem',
    borderBottom: '1px solid #666',
  },
  btnGroup: {
    paddingTop: '1rem',
  },
}

export default DraggableFormControl
