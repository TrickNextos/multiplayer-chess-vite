import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
      userId: localStorage.getItem('userId'),
  }),

  actions: {
    logout() {
      localStorage.removeItem('userId')
      window.location.href = '/auth/login'
    },
    async register(username, password) {
      return await axios.post('auth/register', {
        username: username,
        password: password,
      })
      .then(login_resp => {
        window.location.href = '/'
        localStorage.setItem('userId', login_resp.data.id)
        return {
          error_username_reason: '',
          error_password_reason: '',
        }
      })
      .catch(error => {
        if (error.code != "ERR_BAD_REQUEST") {
          return {
            error_username_reason: '',
            error_password_reason: '',
          }
        }

        let response = error.response.data
        if (response.reason == "Bad password") {
          return {
            error_username_reason: '',
            error_password_reason: response.description,
          }
          
        }
        else if (response.reason == "Bad username") {
          console.log(response, response.description)
          return {
            error_username_reason: response.description,
            error_password_reason: '',
          }
        }
      })
    },
    async get_username() {
      return await axios.get('auth/').then(data => {
        return data.data.username
      })
    },
    async login(username, password) {
      return await axios.post('auth/login', {
        username: username,
        password: password
      })
      .then(login_resp => {
        window.location.href = '/'
        localStorage.setItem('userId', login_resp.data.id)
        return {
          error_username_reason: '',
          error_password_reason: '',
        }
      })
      .catch(error => {
        if (error.code != "ERR_BAD_REQUEST") {
          return {
            error_username_reason: '',
            error_password_reason: '',
          }
        }

        let response = error.response.data
        if (response.reason == "Bad password") {
          return {
            error_username_reason: '',
            error_password_reason: response.description,
          }
          
        }
        else if (response.reason == "Bad user") {
          console.log(response, response.description)
          return {
            error_username_reason: response.description,
            error_password_reason: '',
          }
        }
      })

    }
  },

  getters: {
    is_auth: (state) => {
      return state.userId ? true : false;
    }
  }

})
