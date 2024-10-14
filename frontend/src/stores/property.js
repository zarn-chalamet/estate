import { defineStore } from 'pinia'
import { useApi, useApiPrivate } from '@/composables/useApi'

export const usePropertyStore = defineStore('property', {
  state: () => ({
    properties: [],
    property: {},
  }),
  actions: {
    //get all properties
    async getProperties() {
      try {
        const { data } = await useApi().get('/api/properties')
        this.properties = data
        return data
      } catch (error) {
        console.error('Error fetching blogs:', error.message)
        throw error
      }
    },

    //create property
    async createProperty(payload) {
      try {
        const { data } = await useApiPrivate().post('/api/properties', payload)
        this.properties.push(data)
        return data
      } catch (error) {
        console.error('Error creating property:', error.message)
        throw error
      }
    },

    //get property by id

    //update property

    //delete propery
  },
})
