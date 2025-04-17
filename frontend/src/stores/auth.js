// src/stores/auth.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.user,
  },

  actions: {
    async fetchUser() {
      try {
        const res = await axios.get('http://localhost:3000/api/auth/user', {
          withCredentials: true,
        })
        this.user = res.data.user
      } catch (err) {
        this.user = null
        console.error('ไม่สามารถโหลดข้อมูลผู้ใช้ได้:', err)
      }
    },

    async logout() {
      try {
        await axios.post(
          'http://localhost:3000/api/auth/logout',
          {},
          { withCredentials: true }
        )
        this.user = null
      } catch (err) {
        console.error('Logout error:', err)
      }
    },

    setUser(user) {
      this.user = user
    },
  },
})
