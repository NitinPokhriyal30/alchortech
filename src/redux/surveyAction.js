import { AxiosError, wait } from '../utils'
import { store } from './store'

async function fetchSurvey() {
  store.dispatch({ type: 'surveyLoading' })

  let surveyList = store.getState().survey.list

  if (surveyList.length === 0) {
    await wait(3000)
  }
  
  const json = localStorage.getItem('SURVEY_LIST') || '[]'
  surveyList = JSON.parse(json)
  store.dispatch({ type: 'fetchSurveySuccessful', survey: surveyList })
  return surveyList
}

export async function fetchSurveyWithId(id) {
  let allSurvey = store.getState().survey.list

  if (allSurvey.length === 0) {
    allSurvey = await fetchSurvey()
  } else {
    fetchSurvey()
  }

  const survey = allSurvey.find((x) => x.id === id)

  if (survey == null) {
    throw AxiosError(`survey id ${id} not found`)
  }

  return survey
}

async function removeSurvey(targetSurveyId) {
  store.dispatch({ type: 'surveyLoading' })
  await wait(1000)
  let json = localStorage.getItem('SURVEY_LIST') || '[]'
  const allSurvey = JSON.parse(json).filter((survey) => survey.id !== targetSurveyId)

  json = JSON.stringify(allSurvey)
  localStorage.setItem('SURVEY_LIST', json)

  store.dispatch({ type: 'removeSurveySuccessful', surveyId: targetSurveyId })
}

async function createSurvey(survey) {
  survey.id = Math.random().toString()

  store.dispatch({ type: 'surveyLoading' })
  await wait(2000)
  const allSurvey = JSON.parse(localStorage.getItem('SURVEY_LIST') || '[]')
  const isInLocalStorage = allSurvey.findIndex((x) => survey.id === x.id)
  if (isInLocalStorage !== -1) {
    allSurvey[isInLocalStorage] = survey
  } else {
    allSurvey.push(survey)
  }

  localStorage.setItem('SURVEY_LIST', JSON.stringify(allSurvey))

  store.dispatch({ type: 'createSurveySuccessful', list: allSurvey })
  return survey
}

async function editSurvey(targetSurveyId, surveyChanges) {
  store.dispatch({ type: 'surveyLoading' })
  await wait(2000)

  const allSurvey = JSON.parse(localStorage.getItem('SURVEY_LIST') || '[]')
  const targetSurvey = allSurvey.find((x) => x.id === targetSurveyId)

  if (targetSurvey == null) {
    const error = Error('Failed to find the survey')
    error.isAxiosError = true
    throw error
  }

  Object.assign(targetSurvey, surveyChanges)
  const json = JSON.stringify(allSurvey)
  localStorage.setItem('SURVEY_LIST', json)
  store.dispatch({ type: 'editSurveySuccessful', surveyChanges, targetSurveyId })
}

export { fetchSurvey, removeSurvey, createSurvey, editSurvey }
