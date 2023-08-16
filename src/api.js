import axios from 'axios'
import Cookies from 'js-cookie'

const wait = (ms) => (resolveWith) =>
  new Promise((res) => {
    setTimeout(() => res(resolveWith), ms)
  })

axios.defaults.baseURL = 'http://staging.letshigh5.com/api/v1/'
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
    all: () => axios.get('accounts/').then((r) => r.data),
    profiles: () => axios.get('accounts/').then((r) => r.data),
    userById: (id) => axios.get(`accounts/userprofile/${id}/`).then((r) => r.data),
    search: (params) => axios.get('employees/', { params }).then((r) => r.data),
  },
  
  auth: {
    login: (data) => axios.post('auth/jwt/create/', data).then((r) => r.data),
    user: () => axios.get('accounts/current-user/').then((r) => r.data),

    // useQuery(me) always has user bcoz its called during Login
    // and other routes are Protected Routes
    forgotPassword: (email) => axios.post('/request/password/', email).then((r) => r.data),
    resetPassword: (password, token, uidb64) =>
      axios.patch('passwordreset/complete', { password, token, uidb64 }).then((r) => r.data),
    changeAvatar: (id, formData) =>
      axios.put(`updateUserAvtar/${id}/`, formData).then((r) => r.data),
    me: (id) => axios.get(`accounts/userprofile/${id}/`).then((r) => r.data),
  },

  topStars: {
    all: () => axios.get('transactions/top-employees/').then((r) => r.data),
  },

  transactions: {
    new: (data) =>
      axios
        .post('transactions/', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((r) => r.data),
    all: (filters) => axios.get(`transactions/?${filters.toString()}`).then((r) => r.data),
    // meAsRecipient: (id) => axios.get(`api/posts/?recipients=${id}`).then((r) => r.data),
    // meAsSender: (id) => axios.get(`api/posts/?sender=${id}`).then((r) => r.data),
    meAsRecipient: (id, filterBy) =>
      axios
        .get(`transactions/?recipients=${id}&date_range=${filterBy}`)
        .then((r) => r.data),
    meAsSender: (id, filterBy) =>
      axios
        .get(`transactions/?sender=${id}&date_range=${filterBy}`)
        .then((r) => r.data),
    react: (data) => axios.post('transactions/add-reaction/', data).then((r) => r.data),
    allReactions: (data) => axios.get(`transactions/transaction-reactions/${data.post_id}/`).then((r) => r.data),
    updateReaction: (data) =>
      axios.patch(`transactions/update-user-reaction/${data.post_id}/`, data).then((r) => r.data),
  },
  comment: {
    new: (data) =>
      axios
        .post(`transactions/comments/${data.post_id}/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((r) => r.data),
    all: () => axios.get('transactions/comments/').then((r) => r.data),
    react: (data) => axios.post('add-reaction/', data).then((r) => r.data),
    by_id: (data) => axios.get(`transactions/comments/${data.post_id}/`).then(r=> r.data)
  },
  todayEvents: () => axios.get('transactions/today-events/').then((r) => r.data),

  properties: () => axios.get('common/properties/').then((r) => r.data),

  analytics: {
    all: () => axios.get('analytics/').then((r) => r.data),
    filters: () => axios.get('analytics/filters/').then((r) => r.data),
    
  }
}

export { api }
