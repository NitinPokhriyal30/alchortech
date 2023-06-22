import MenuIcon from '@mui/icons-material/Menu'
import {
  Box,
  Button,
  ButtonBase,
  IconButton,
  InputBase,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import * as React from 'react'
import { useLayoutEffect } from 'react'
import { useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import SurveyPublishModal from '../components/Survey/SurveyPublishModal'
import SurveySaveModal from '../components/Survey/SurveySaveModal'
import TopLoadingBar from '../components/TopLoadingBar'
import DraggableFormControl from '../components/DraggableFormControl'
import { fetchSurvey, fetchSurveyWithId } from '../redux/surveyAction'
import SurveyPreviewModal from '../components/Survey/SurveyPreviewModal'
import SurveySidebar from '../components/Survey/SurveySidebar'
import { AxiosError, wait } from '../utils'

function reducer(state, payload) {
  switch (payload.action) {
    case 'addInputControl': {
      const { formInputName } = payload

      return state.concat({
        id: Math.random().toString(),
        question: 'Question Edit here',
        image: null,
        formInputName,
        children: [{ type: formInputName, props: { label: formInputName } }],
      })
    }

    case 'deleteInputControl': {
      const targetControlId = payload.inputControlId

      return state.filter((inputControl) => inputControl.id !== targetControlId)
    }

    case 'editQuestion': {
      const { index, value } = payload
      state[index].question = value

      return [...state]
    }

    case 'toggleRequiredInputControl': {
      const { index, checked } = payload
      state[index].required = checked

      return [...state]
    }

    case 'removeChildInput': {
      const { index, targetChild } = payload
      const child_i = state[index].children.indexOf(targetChild)

      if (state[index].children.length <= 1) return state

      state[index].children.splice(child_i, 1)

      return [...state]
    }

    case 'addChildInput': {
      const { index, type } = payload

      state[index].children.push({
        type: type,
        props: { label: type },
      })

      return [...state]
    }

    case 'editChildInput': {
      const { index, value, targetChild } = payload
      const child_i = state[index].children.indexOf(targetChild)

      state[index].children[child_i].props.label = value

      return [...state]
    }

    case 'reorder': {
      const { startIndex, endIndex } = payload

      const [removed] = state.splice(startIndex, 1)
      state.splice(endIndex, 0, removed)

      return [...state]
    }

    case 'populate': {
      return payload.form
    }

    default: {
      console.error('Survey Create Page Reducer: unknown action was passed', payload)
      throw Error('Survey Create Page Reducer: unknown action was passed')
    }
  }
}

export const SurveyPageContext = React.createContext(null)

function SurveryCreatePage() {
  const [params, setParams] = useSearchParams()
  const surveyId = params.get('id')

  const surveyStore = useSelector((store) => store.survey)
  const survey = surveyStore.list.find((x) => x.id === params.get('id'))

  const [form, dispatch] = React.useReducer(reducer, survey ? survey.form : [])
  const [modal, setModal] = React.useState('')
  const [error, setError] = React.useState(false)
  const [showSidebar, setShowSidebar] = React.useState(false)
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const [loading, setLoading] = React.useState('')

  function reorder({ destination, source }) {
    const startIndex = source.index
    const endIndex = destination.index

    dispatch({
      action: 'reorder',
      startIndex,
      endIndex,
    })
  }

  useEffect(() => {
    document.addEventListener('click', (e) => {
      const sidebar = document.querySelector('#sidebar')
      const sidebarBtn = document.querySelector('#sidebar-btn')
      const target = e.target

      if (sidebar?.contains(target) || sidebarBtn?.contains(target)) return
      setShowSidebar(false)
    })
  }, [])

  useEffect(() => {
    const fn = async () => {
      try {
        if (survey == null) {
          const survey = await fetchSurveyWithId(surveyId)

          dispatch({
            action: 'populate',
            form: survey.form,
          })

          setError(false)
        }
      } catch (error) {
        if (error.isAxiosError) {
          setError(true)
        }
        console.error('SurveyCreatePage.useEffect(() => fetchSurvey() )', error)
      }
    }
    fn()
  }, [surveyId, survey])

  if (error || !surveyId) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center' }}>
        <Typography textAlign="center" variant="h5" mt={14} color="rgba(0 0 0 / 0.2)">
          404 <br />
          This survey does not exists.
        </Typography>
      </Box>
    )
  }

  return (
    <SurveyPageContext.Provider value={[form, dispatch]}>
      <TopLoadingBar loading={surveyStore.isLoading} />

      {survey == null ? null : (
        <main>
          <Box
            sx={isDesktop ? { gridTemplateColumns: '300px 1fr' } : { gridTemplateColumns: '1fr' }}
            style={S.wrapper}
          >
            <Box
              id="sidebar"
              sx={
                isDesktop
                  ? { position: 'sticky', top: 0, height: '90vh', paddingTop: 2 }
                  : {
                      position: 'fixed',
                      left: showSidebar ? 0 : '-100%',
                      top: 0,
                      bottom: 0,
                      zIndex: 100,
                    }
              }
            >
              <SurveySidebar setShowSidebar={setShowSidebar} dispatch={dispatch} />
            </Box>

            {/* Form Builder */}
            <div style={S.formBuilder}>
              <Stack direction="row" alignItems="center" spacing={1} p={2}>
                {!isDesktop && (
                  <IconButton id="sidebar-btn" onClick={() => setShowSidebar((p) => !p)}>
                    <MenuIcon />
                  </IconButton>
                )}
                <Typography variant="h5">{survey.title}</Typography>

                <Button
                  size="small"
                  style={{ marginLeft: 'auto' }}
                  onClick={() => setModal('SURVEY_PREVIEW')}
                >
                  Preview
                </Button>

                <Button size="small" onClick={() => setModal('SURVEY_SAVE')}>
                  Save
                </Button>
                <Button variant="contained" size="small" onClick={() => setModal('SURVEY_PUBLISH')}>
                  Publish
                </Button>
              </Stack>

              {form.length === 0 ? (
                <Box sx={{ paddingTop: 15, textAlign: 'center', color: 'gray' }}>
                  <Typography>Drag or Click on any control from left sidebar</Typography>
                </Box>
              ) : (
                <DragDropContext onDragEnd={reorder}>
                  <Droppable droppableId="form-builder-1">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {form.map(({ question, children, id, ...rest }, i) => (
                          <DraggableFormControl
                            dispatch={dispatch}
                            key={id}
                            questionValue={question}
                            inputElements={children}
                            id={id}
                            index={i}
                            {...rest}
                          />
                        ))}

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </div>
          </Box>

          <SurveyPreviewModal
            key={Math.random().toString()}
            open={modal === 'SURVEY_PREVIEW'}
            onClose={() => setModal('')}
            surveyForm={form}
          />

          <SurveyPublishModal
            open={modal === 'SURVEY_PUBLISH'}
            onClose={() => setModal('')}
            surveyForm={form}
          />

          <SurveySaveModal
            open={modal === 'SURVEY_SAVE'}
            onClose={() => setModal('')}
            surveyForm={form}
          />
        </main>
      )}
    </SurveyPageContext.Provider>
  )
}

const S = {
  wrapper: {
    display: 'grid',
    gap: '1rem',
    justifyContent: 'start',
  },
  sideBar: {
    listStyle: 'none',
    width: '100%',
  },
  formBuilder: {
    borderRadius: '10px',
    textAlign: 'left',
    minHeight: '100px',
    width: '100%',
    padding: '0 .5rem',
  },
}

export const formInputTypeMap = {
  textField: function (props) {
    return (
      <div>
        <TextField placeholder="Type here..." {...props} label={undefined} />
      </div>
    )
  },
  checkBox: (props) => (
    <Box
      style={{
        display: 'flex',
        width: 'fit-content',
        alignItem: 'center',
        gap: '.5rem',
        backgroundColor: '#ddd',
        padding: '0 0.5rem',
      }}
    >
      <input {...props} onChange={undefined} readOnly type="checkbox" />

      <InputBase defaultValue={props.label} onChange={props.onChange} />

      <ButtonBase
        onClick={() => props.onDelete(props.id)}
        sx={(theme) => ({ color: theme.palette.warning })}
      >
        &times;
      </ButtonBase>
    </Box>
  ),
  radioButton: (props) => (
    <Box
      style={{
        display: 'flex',
        width: 'fit-content',
        alignItem: 'center',
        gap: '.5rem',
        backgroundColor: '#ddd',
        padding: '0 0.5rem',
      }}
    >
      <input {...props} onChange={undefined} type="radio" readOnly />

      <InputBase value={props.label} onChange={props.onChange} />

      <ButtonBase
        onClick={() => props.onDelete(props.id)}
        sx={(theme) => ({ color: theme.palette.warning })}
      >
        &times;
      </ButtonBase>
    </Box>
  ),
  select: (props) => (
    <div>
      <Select {...props} onChange={undefined} label={undefined} readOnly native>
        {props.label
          .split(',')
          .filter(Boolean)
          .map((optionValue) => (
            <option value={optionValue} key={optionValue}>
              {optionValue}
            </option>
          ))}
      </Select>

      <Typography sx={{ marginTop: 2 }} color="gray" variant="body2">
        Note: Enter the options comma separated
      </Typography>

      <Box>
        <TextField
          minRows={3}
          maxRows={10}
          style={{ width: 200 }}
          value={props.label}
          onChange={props.onChange}
          multiline
        />
      </Box>
    </div>
  ),
}

export default SurveryCreatePage
