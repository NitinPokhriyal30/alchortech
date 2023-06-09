import axios from 'axios'
import Cookies from 'js-cookie'

const wait = (ms) => (resolveWith) =>
  new Promise((res) => {
    setTimeout(() => res(resolveWith), ms)
  })

axios.defaults.baseURL = 'http://backend.letshigh5.com/'
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use(
  (request) => {
    const token = Cookies.get('token')
    if (token) request.headers.Authorization = 'Bearer ' + token
    // console.log(request)
    return request
  },
  (error) => {
    // console.log(error)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    // console.log(response)
    return response
  },
  (error) => {
    // console.log(error)
    return Promise.reject(error)
  }
)

const api = {
  auth: {
    login: (data) => axios.post('login/', data).then((r) => r.data),

    // useQuery(me) always has user bcoz its called during Login
    // and other routes are Protected Routes
    me: (id) => axios.get(`getUserDetails/${id}/`).then((r) => r.data),
  },
  users: {
    all: () => axios.get('getUsers/').then((r) => r.data),
    profiles: () => axios.get('users/profile/').then((r) => r.data),
    search: (params) => axios.get('employees/', { params }).then((r) => r.data),
  },

  transactions: {
    new: (data) =>
      axios
        .post('homepage/transaction/', data, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((r) => r.data),
    all: () =>
      axios
        .get('homepage/transaction/')
        .then((r) => r.data)
        .then((data) => data.reverse()),
  },

  todayEvents: () =>
    axios.get('http://backend.letshigh5.com/api/today-events/').then((r) => r.data),

  properties: () => axios.get('homepage/properties/').then((r) => r.data[0]),
}

export { api }
