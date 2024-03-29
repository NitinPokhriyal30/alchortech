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
    currentUser: () => axios.get(`api/v1/accounts/current-user/`).then((r) => r.data),
  },

  auth: {
    login: (data) => axios.post('api/v1/auth/jwt/create/', data).then((r) => r.data),

    // useQuery(me) always has user bcoz its called during Login
    // and other routes are Protected Routes
    forgotPassword: (email) => axios.post('/request/password/', email).then((r) => r.data),
    resetPassword: (password, token, uidb64) => axios.patch('passwordreset/complete', { password, token, uidb64 }).then((r) => r.data),
    updateAvatar: ({formData}) => axios.post(`api/v1/accounts/update-profile/avatar/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data),
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
  countries: () => axios.get('api/v1/common/countries/').then((r) => r.data),


  rewards: {
    redeemable: () => axios.get('api/v1/rewards/redeemable-rewards/').then((r) => r.data),
    redeem: (formData) => axios.post(`api/v1/rewards/redeem-voucher/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data),
    rewardsHistory: () => axios.get('api/v1/rewards/reward-history/').then((r) => r.data),
  },

  analytics: {
    all: (department, region, date) =>
      axios
        .get(`/api/v1/analytics/?region=${region}&Date_Ranges=${date}`)
        .then((r) => r.data),
    filters: () => axios.get('/api/v1/analytics/filters/').then((r) => r.data),
  },

  campaigns: {
    all: (page, tab, dateRange) => axios.get(`api/v1/campaigns?pagination=1&page_size=5&page=${page}&status=${tab}&date_range=${dateRange}`).then((r) => r.data),
    mycampaign: () => axios.get('api/v1/campaigns/my-campaigns/').then((r) => r.data),
    campaignDetails: (campaignId) => axios.get(`api/v1/campaigns/${campaignId}/`).then((r) => r.data),
    deleteCampaign: (campaignId) => axios.delete(`api/v1/campaigns/delete/${campaignId}/`).then((r) => r.data),
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
    addRulesAndRewards: (formData, campaignId) =>
      axios.post(`api/v1/campaigns/add-rules-and-rewards/${campaignId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((r) => r.data),
    participate: (formData, campaignId) =>
      axios.post(`api/v1/campaigns/participate/${campaignId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((r) => r.data),
    update: (formData, campaignId) =>
      axios
        .patch(`api/v1/campaigns/update-campaign/${campaignId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((r) => r.data),
    updateParticipants: (formData, campaignId) =>
      axios.patch(`api/v1/campaigns/add-participants-to-campaign/${campaignId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((r) => r.data),
    updateRulesAndRewards: (formData, campaignId) =>
      axios.patch(`api/v1/campaigns/add-rules-and-rewards/${campaignId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((r) => r.data),
  },

  faqs: {
    list: ({ id }) => axios.get(`api/v1/support/faqs/?category=${id}`).then((r) => r.data),
    categories: () => axios.get('api/v1/support/categories').then((r) => r.data),
    search: ({ params }) => axios.get(`api/v1/support/search-faq/?params=${params}`).then((r) => r.data),
  },

  surveys: {
    // all: () => axios.get('api/v1/surveys/').then((r) => r.data),
    all: (params) => axios.get(`api/v1/surveys?${params.toString()}`).then((r) => r.data),
    surveyById: (id) => axios.get(`api/v1/surveys/get-survey-by-id/${id}/`).then((r) => r.data),
    createDetails: (formData) =>
      axios.post(`api/v1/surveys/create-survey/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((r) => r.data),
    updateDetails: (formData, surveyId) =>
      axios.patch(`api/v1/surveys/update-survey/${surveyId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((r) => r.data),
    questions: (formData, surveyId) =>
      axios.post(`api/v1/surveys/add-questions/${surveyId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((r) => r.data),
    addParticipants: (formData, surveyId) =>
      axios.post(`api/v1/surveys/add-participants-to-survey/${surveyId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((r) => r.data),
    updateParticipants: (formData, surveyId) =>
      axios.patch(`api/v1/surveys/add-participants-to-survey/${surveyId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((r) => r.data),
    addGroup: (formData, surveyId) =>
      axios.post(`api/v1/surveys/add-participants-to-survey/${surveyId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((r) => r.data),
    addRulesAndRewards: (formData, surveyId) =>
      axios.post(`api/v1/surveys/add-rules-and-rewards/${surveyId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((r) => r.data),
    updateRulesAndRewards: (formData, surveyId) =>
      axios.patch(`api/v1/surveys/add-rules-and-rewards/${surveyId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((r) => r.data)
  },

  quizs: {
    // all: () => axios.get('api/v1/quizs/').then((r) => r.data),
    all: (params) => axios.get(`api/v1/quizzes/?${params.toString()}`).then((r) => r.data),
    details: (formData) =>
      axios.post(`api/v1/quizzes/create-quiz/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((r) => r.data),
    questions: (formData, quizId) =>
      axios.post(`api/v1/quizzes/add-questions/${quizId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((r) => r.data),
    addParticipants: (formData, quizId) =>
      axios.post(`api/v1/quizs/add-participants-to-quiz/${quizId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((r) => r.data),
    addGroup: (formData) =>
      axios.post(`api/v1/quizs/add-group/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((r) => r.data),
    addRulesAndRewards: (formData, quizId) =>
      axios.post(`api/v1/quizs/add-rules-and-rewards/${quizId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((r) => r.data)
  },

  voiceout: {
    categories: () => axios.get('api/v1/support/voiceoutcategories/').then((r) => r.data),
    create: (formData) =>
      axios.post(`api/v1/support/voiceouts/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((r) => r.data),
  },

  // Admin APIS

  adminUsers: {
    all: () => axios.get('api/v1/accounts/admin/all/').then((r) => r.data),
    userDetails: ({userId}) => axios.get(`api/v1/accounts/admin/user-details/${userId}`).then((r) => r.data),
    patchUser: ({userId, formData}) => axios.patch(`api/v1/accounts/admin/user-details/${userId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((r) => r.data),
    deactivate: (formData) => axios.post(`api/v1/accounts/deactivate-user/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((r) => r.data),
    register: ({formData}) => axios.post('api/v1/accounts/admin/create-user/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((r) => r.data),
    availableVouchers: ({pageSize, page}) => axios.get(`api/v1/rewards?pagination=1&page_size=${pageSize}&page=${page}`).then((r) => r.data),
    redemptionHistory: () => axios.get('api/v1/rewards/admin/redemption-history/').then((r) => r.data),
    approvals: ({tab}) => axios.get(`api/v1/rewards/admin/order-requests?status=${tab}`).then((r) => r.data),
    approveRewards: ({formData}) => axios.post('api/v1/rewards/approve-reward/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((r) => r.data),
    adminLogs: ({pageSize, page}) => axios.get(`api/v1/accounts/admin/user-login-logs?pagination=1&page_size=${pageSize}&page=${page}`).then((r) => r.data),
  }

}

let isVerifyingPromise = null;

axios.interceptors.request.use(
  async (request) => {
    const token = Cookies.get('token')

    if (token && !request.url.includes('jwt')) {
      // verify access token
      isVerifyingPromise = isVerifyingPromise ?? api.auth.verifyToken(token).finally(() => { isVerifyingPromise = null })
      const isValid = await isVerifyingPromise;

      if (!isValid) {
        try {
          // get new access token from /refresh-token
          console.info('refreshing token')
          const refreshToken = Cookies.get('refresh')
          //isRefreshPromise = isRefreshPromise ?? api.auth.refreshToken(refreshToken).finally(() => { isRefreshPromise = null });
          //const { access: newToken } = await isRefreshPromise

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