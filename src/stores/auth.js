import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
      userId: localStorage.getItem('userId'),
    token: localStorage.getItem('accessToken'),
  }),

  actions: {
    logout() {
      localStorage.removeItem('userId')
      localStorage.removeItem('accessToken')
    },
    async login(username, password) {
      axios.post('auth/login', {
        username: username,
        password: password
      })
      .then(login_resp => {
        window.location.href = '/'
        localStorage.setItem('userId', login_resp.data.id)
        localStorage.setItem('accessToken', login_resp.data.access_token)
      })
      .catch(error => {

      })

    }
  },

  getters: {
    is_auth: (state) => {
      return state.userId ? true : false;
    }
  }

})
