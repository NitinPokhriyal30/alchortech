import { combineReducers, legacy_createStore as createStore } from 'redux'
import userReducer, { userInitialState } from './userReducer'
import { surveyReducer, surveyInitialState } from './surveyReducer'
import postReducer, { postInitialState } from './postReducer'
import sidebarReducer from './sidebarReducer'

const rootReducer = combineReducers({
  user: userReducer,
  survey: surveyReducer,
  post: postReducer,
  sidebar: sidebarReducer,
})
const store = createStore(rootReducer, {
  user: userInitialState,
  survey: surveyInitialState,
  post: postInitialState,
  sidebar: false,
})

export { store }
