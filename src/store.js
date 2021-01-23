import axios from 'axios'

const request = (url, method, data, callback = () => console.log('Request ran')) => {
  return new Promise((resolve, reject) => {
    switch (method) {
      case 'get':
        axios.get(process.env.VUE_APP_BACKEND_URL + url, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token') || ''}`
          }
        })
        .then(response => {
          callback(response.data)
          resolve(response.data)
        })
        .catch(error => {
          callback(error.response.data)
          reject(error.response.data)
        })
        break;
        case 'post':
        axios.post(process.env.VUE_APP_BACKEND_URL + url, data, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token') || ''}`
          }
        })
        .then(response => {
          callback(response.data)
          resolve(response.data)
        })
        .catch(error => {
          callback(error.response.data)
          reject(error.response.data)
        })
        break;
        case 'patch':
        axios.patch(process.env.VUE_APP_BACKEND_URL + url, data, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token') || ''}`
          }
        })
        .then(response => {
          callback(response.data)
          resolve(response.data)
        })
        .catch(error => {
          callback(error.response.data)
          reject(error.response.data)
        })
        break;
      default:
        reject({
          status: 'Failed',
          message: 'Request method not supported!'
        })
        break;
    }
  })
}

export default {
  state () {
    return {
      registerData: {
        userName: '',
        email: '',
        password: ''
      }
    }
  },
  actions: {
    requestRegister (_, payload) {
      return request('/api/users/register', 'post', payload)
    },
    activateAccount (_, payload) {
      return request('/api/users/activate', 'patch', payload)
    }
  },
  mutations: {
    updateRegister ({ registerData }, payload) {
      registerData.userName = payload.userName
      registerData.email = payload.email
      registerData.password = payload.password
    }
  },
  getters: {
    registerData ({ registerData }) {
      return registerData
    }
  }
}
