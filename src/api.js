import axios from 'axios'

const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN')
axios.defaults.baseURL = 'http://backend.letshigh5.com/'
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use(
  (request) => {
    console.log(request)
    return request
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    console.log(response)
    return response
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

const api = {

  auth: {
    login: (data) => axios.post('login/', data),
  }

}

export { api }
