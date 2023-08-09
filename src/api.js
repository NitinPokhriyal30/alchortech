import axios from 'axios'
import Cookies from 'js-cookie'

const wait = (ms) => (resolveWith) =>
  new Promise((res) => {
    setTimeout(() => res(resolveWith), ms)
  })

axios.defaults.baseURL = 'http://staging.letshigh5.com/'
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
  users: {
    all: () => axios.get('getUsers/').then((r) => r.data),
    profiles: () => axios.get('users/profile/').then((r) => r.data),
    userById: (id) => axios.get(`getUserDetails/${id}/`).then((r) => r.data),
    search: (params) => axios.get('employees/', { params }).then((r) => r.data),
  },
  
  auth: {
    login: (data) => axios.post('login/', data).then((r) => r.data),

    // useQuery(me) always has user bcoz its called during Login
    // and other routes are Protected Routes
    forgotPassword: (email) => axios.post('/request/password/', email).then((r) => r.data),
    resetPassword: (password, token, uidb64) =>
      axios.patch('passwordreset/complete', { password, token, uidb64 }).then((r) => r.data),
    changeAvatar: (id, formData) =>
      axios.put(`updateUserAvtar/${id}/`, formData).then((r) => r.data),
    me: (id) => axios.get(`getUserDetails/${id}/`).then((r) => r.data),
  },

  topStars: {
    all: () => axios.get('top-employees/').then((r) => r.data),
  },

  transactions: {
    new: (data) =>
      axios
        .post('transaction/', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((r) => r.data),
    all: (filters) => axios.get(`transaction/?${filters.toString()}`).then((r) => r.data),
    // meAsRecipient: (id) => axios.get(`api/posts/?recipients=${id}`).then((r) => r.data),
    // meAsSender: (id) => axios.get(`api/posts/?sender=${id}`).then((r) => r.data),
    meAsRecipient: (id, filterBy) =>
      axios
        .get(`transaction/?recipients=${id}&date_range=${filterBy}`)
        .then((r) => r.data),
    meAsSender: (id, filterBy) =>
      axios
        .get(`transaction/?sender=${id}&date_range=${filterBy}`)
        .then((r) => r.data),
    react: (data) => axios.post('add-reaction/', data).then((r) => r.data),
    allReactions: (data) => axios.get(`transaction-reactions/${data.post_id}/`).then((r) => r.data),
    updateReaction: (data) =>
      axios.patch(`update-user-reaction/${data.post_id}/`, data).then((r) => r.data),
  },
  comment: {
    new: (data) =>
      axios
        .post(`comments/${data.post_id}/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((r) => r.data),
    all: () => axios.get('comments/').then((r) => r.data),
    react: (data) => axios.post('add-reaction/', data).then((r) => r.data),
    by_id: (data) => axios.get(`comments/${data.post_id}/`).then(r=> r.data)
  },
  todayEvents: () => axios.get('api/today-events/').then((r) => r.data),

  properties: () => axios.get('properties/').then((r) => r.data),
}

export { api }
