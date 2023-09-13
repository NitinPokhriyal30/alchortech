import axios from 'axios'
import { toast } from "react-toastify"
import Cookies from 'js-cookie'

const wait = (ms) => (resolveWith) =>
  new Promise((res) => {
    setTimeout(() => res(resolveWith), ms)
  })

axios.defaults.baseURL = 'http://staging.letshigh5.com/'
axios.defaults.headers.post['Content-Type'] = 'application/json'

const api = {
  users: {
    all: () => axios.get('getUsers/').then((r) => r.data),
    profiles: () => axios.get('api/v1/accounts/').then((r) => r.data),
    userById: (id) => axios.get(`api/v1/accounts/userprofile/${id}/`).then((r) => r.data),
    // search: (params) => axios.post('api/v1/accounts/search-user/', params, {headers: {"Content-Type": "multipart/form-data"}}).then((r) => r.data),
    search: (params) => axios.get(`api/v1/accounts/search-user?${params.toString()}`).then((r) => r.data),
  },

  auth: {
    login: (data) => axios.post('api/v1/auth/jwt/create/', data).then((r) => r.data),

    // useQuery(me) always has user bcoz its called during Login
    // and other routes are Protected Routes
    forgotPassword: (email) => axios.post('/request/password/', email).then((r) => r.data),
    resetPassword: (password, token, uidb64) => axios.patch('passwordreset/complete', { password, token, uidb64 }).then((r) => r.data),
    changeAvatar: (id, formData) => axios.put(`updateUserAvtar/${id}/`, formData).then((r) => r.data),
    me: (id) => axios.get(`api/v1/accounts/userprofile/${id}/`).then((r) => r.data),
    currentUser: () => axios.get(`api/v1/accounts/current-user/`).then((r) => r.data),
    verifyToken: (token) =>
      axios
        .post('api/v1/auth/jwt/verify/', { token })
        .then(() => true)
        .catch((err) => {
          console.log(err)
          return false
        }),
    refreshToken: (refresh) => axios.post('api/v1/auth/jwt/refresh/', { refresh }).then((r) => r.data),
  },

  topStars: {
    all: () => axios.get('api/v1/transactions/top-employees').then((r) => r.data),
  },

  transactions: {
    new: (data) =>
      axios
        .post('api/v1/transactions/', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((r) => r.data),
    all: (filters) => axios.get(`api/v1/transactions?${filters.toString()}`).then((r) => r.data),
    // meAsRecipient: (id) => axios.get(`api/posts/?recipients=${id}`).then((r) => r.data),
    // meAsSender: (id) => axios.get(`api/posts/?sender=${id}`).then((r) => r.data),
    meAsRecipient: (id, filterBy, page, pageSize) => axios.get(`api/v1/transactions?recipients=${id}&date_range=${filterBy}`).then((r) => r.data),
    meAsSender: (id, filterBy, page, pageSize) => axios.get(`api/v1/transactions?sender=${id}&date_range=${filterBy}`).then((r) => r.data),
    react: (data) => axios.post('api/v1/transactions/add-reaction/', data).then((r) => r.data),
    allReactions: (data) => axios.get(`api/v1/transactions/transaction-reactions/${data.post_id}/`).then((r) => r.data),
    updateReaction: (data) => axios.patch(`api/v1/transactions/update-user-reaction/${data.post_id}/`, data).then((r) => r.data),
  },
  comment: {
    new: (data) =>
      axios
        .post(`api/v1/transactions/comments/${data.post_id}/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((r) => r.data),
    all: () => axios.get('api/v1/transactions/comments/').then((r) => r.data),
    react: (data) => axios.post('api/v1/transactions/add-reaction/', data).then((r) => r.data),
    by_id: (data) => axios.get(`api/v1/transactions/comments/${data.post_id}/`).then((r) => r.data),
  },
  todayEvents: () => axios.get('api/v1/transactions/today-events/').then((r) => r.data),
  departments: () => axios.get('api/v1/common/departments/').then((r) => r.data),
  properties: () => axios.get('api/v1/common/properties/').then((r) => r.data),

  analytics: {
    all: (department, region, date) =>
      axios
        .get(`/api/v1/analytics/?department=${department}&region=${region}&Date_Ranges=${date}`)
        .then((r) => r.data),
    filters: () => axios.get('/api/v1/analytics/filters/').then((r) => r.data),
  },



  campaigns: {
    all: (page) => axios.get(`api/v1/campaigns?pagination=1&page_size=5&page=${page}`).then((r) => r.data),
    mycampaign: () => axios.get('api/v1/campaigns/my-campaigns/').then((r) => r.data),
    campaignDetails: (campaignId) => axios.get(`api/v1/campaigns/${campaignId}/`).then((r) => r.data),
    create: (formData) =>
      axios
        .post('api/v1/campaigns/create-campaign/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((r) => r.data),

    addParticipants: (formData, campaignId) =>
      axios.post(`api/v1/campaigns/add-participants-to-campaign/${campaignId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((r) => r.data),

    addGroup: (formData) =>
      axios.post(`api/v1/campaigns/add-group/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((r) => r.data),

    participate: (formData, campaignId) =>
      axios.post(`api/v1/campaigns/participate/${campaignId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((r) => r.data),
  },

  faqs: {
    list: () => axios.get('api/v1/support/faqs/').then((r) => r.data),
    categories: () => axios.get('api/v1/support/categories').then((r) => r.data),
  },

  surveys: {
    all: () => axios.get('api/v1/surveys/').then((r) => r.data),
  }


}

axios.interceptors.request.use(
  async (request) => {
    const token = Cookies.get('token')

    if (token && !request.url.includes('jwt')) {
      // verify access token
      const isValid = await api.auth.verifyToken(token)

      if (!isValid) {
        try {
          // get new access token from /refresh-token
          console.info('refreshing token')
          const refreshToken = Cookies.get('refresh')
          const { access: newToken } = await api.auth.refreshToken(refreshToken)
          request.headers.Authorization = 'Bearer ' + newToken
          Cookies.set('token', newToken)
          console.info('refreshed token ✔️')
        } catch (err) {
          toast.warn("Session has expired.")
          console.log(err)
          Cookies.remove('refresh')
          Cookies.remove('token')
          Cookies.remove('user_id')
        }
      } else {
        request.headers.Authorization = 'Bearer ' + token
      }
    }
    return request
  },
  (error) => {
    // console.log(error)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // console.log(error)
    return Promise.reject(error)
  }
)

export { api }
