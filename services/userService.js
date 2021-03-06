import axios from 'axios'
const apiClient = axios.create({
  baseURL: 'https://aqli-ecommerce.herokuapp.com'
})
apiClient.interceptors.request.use((config) => {
  config.headers.common.Authorization =
    'Bearer ' + localStorage.getItem('token')
  return config
})
export default {
  loginUser(email, password) {
    return apiClient.post('/users/login', {
      params: {
        email,
        password
      }
    })
  },
  signupUser(email, password) {
    return apiClient.post('/users', {
      params: {
        email,
        password
      }
    })
  },
  logoutUser() {
    return apiClient.post('/users/logout')
  },
  getUser() {
    return apiClient.get('/users/me')
  },
  modifyUser(user) {
    return apiClient.patch('/users/me', {
      params: user
    })
  }
}
