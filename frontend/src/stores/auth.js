import { defineStore } from 'pinia'
import { useApi, useApiPrivate } from '../composables/useApi'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: {},
      accessToken: localStorage.getItem('token') || '',
      authReady: false,
    }
  },

  getters: {
    userDetail: state => state.user,
    isAuthenticated: state => !!state.accessToken,
  },

  actions: {
    async attempt() {
      try {
        if (!this.accessToken) {
          // If there's no token, try to refresh it
          await this.refresh()
        }
        await this.getUser()
      } catch (error) {
        return error
      }
    },

    async login(payload) {
      try {
        console.log('login from auth.js ran')
        console.log(payload)
        const { data } = await useApi().post(`/api/auth/login`, payload)
        console.log(data)
        this.accessToken = data.access_token
        localStorage.setItem('token', data.access_token)
        console.log(this.accessToken)
        await this.getUser()
        return data
      } catch (error) {
        throw error.message
      }
    },

    async register(payload) {
      try {
        const { data } = await useApi().post(`/api/auth/register`, payload)
        console.log(data)
        return data
      } catch (error) {
        throw error.message
      }
    },

    async getUser() {
      try {
        const { data } = await useApiPrivate().get(`/api/auth/user`)
        this.user = data
        return data
      } catch (error) {
        throw error.message
      }
    },

    async logout() {
      try {
        const { data } = await useApiPrivate().post(`/api/auth/logout`)
        this.accessToken = ''
        this.user = {}
        localStorage.removeItem('token')
        return data
      } catch (error) {
        throw error.message
      }
    },

    async refresh() {
      try {
        const { data } = await useApi().post(`/api/auth/refresh`)
        this.accessToken = data.access_token
        localStorage.setItem('token', data.access_token)
        return data
      } catch (error) {
        throw error.message
      }
    },

    async getUserById(id) {
      try {
        const { data } = await useApi().get(`/api/auth/${id}`)
        console.log('fetch from api')
        console.log(data)
        return data
      } catch (error) {
        throw error.message
      }
    },
  },
})
