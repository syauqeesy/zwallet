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
      },
      user: {},
      token: null || localStorage.getItem('token'),
      userId: null || localStorage.getItem('userId')
    }
  },
  actions: {
    requestRegister (_, payload) {
      return request('/api/users/register', 'post', payload)
    },
    activateAccount (_, payload) {
      return request('/api/users/activate', 'patch', payload)
    },
    requestLogin ({ commit }, payload) {
      return request('/api/users/login', 'post', payload, (data) => {
        commit('setCredentials', data.data)
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('userId', data.data.userId)
      })
    },
    getUser ({ commit }, payload) {
      return request(`/api/users/${payload}`, 'get', {}, (data) => {
        commit('setUser', data.data)
      })
    }
  },
  mutations: {
    updateRegister (state, payload) {
      state.registerData.userName = payload.userName
      state.registerData.email = payload.email
      state.registerData.password = payload.password
    },
    setUser (state, payload) {
      state.user = payload
    },
    setCredentials (state, payload) {
      state.token = payload.token
      state.userId = payload.userId
    }
  },
  getters: {
    registerData (state) {
      return state.registerData
    },
    user (state) {
      return state.user
    },
    credentials (state) {
      return {
        token: state.token,
        userId: state.userId
      }
    }
  }
}
