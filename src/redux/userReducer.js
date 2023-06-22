import PostUser from '../assets/images/post-img/post-user.png'

const userInitialState = {
  loggedIn: true,
  id: Math.random().toString(),
  firstName: 'Semad',
  lastName: 'Javed',
  img: PostUser,
}

function userReducer(state = userInitialState, _action) {
  // not inplemented
  return state
}

export default userReducer
export { userInitialState }
