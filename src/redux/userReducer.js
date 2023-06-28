import { api } from '@/api'
import PostUser from '../assets/images/post-img/post-user.png'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

const userInitialState = {
  isLoading: false,
  loggedIn: false,
}

function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case 'user/login': {
      return {
        ...state,
        isLoading: true,
      }
    }

    case 'user/login_done': {
      return {
        isLoading: false,
        loggedIn: true,

        token: action.token,
      }
    }

    case 'user/login_fail': {
      return {
        isLoading: false,
        loggedIn: false,
        error: action.error,
      }
    }

    case 'user/logout': {
      return { ...userInitialState }
    }
  }
  return state
}

/**
 * @param {{ email: string; password: string}} data
 */
function loginUser(data) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'user/login' })
      const { token } = await api.auth.login(data)
      Cookies.set('USER_TOKEN', token)
      dispatch({ type: 'user/login_done', token })
    } catch (error) {
      dispatch({ type: 'user/login_fail', error })
      toast.error('Invalid Email ID or Password')
    }
  }
}

export default userReducer
export { userInitialState, loginUser }
