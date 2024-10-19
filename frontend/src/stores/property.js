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
        console.error('Error fetching properties:', error.message)
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
    async getProperty(id) {
      try {
        const { data } = await useApi().get(`/api/properties/${id}`)
        this.property = data
        return data
      } catch (error) {
        console.error('Error fetching property:', error.message)
        throw error
      }
    },

    //update property
    async updateProperty(id, payload) {
      try {
        const { data } = await useApi().put(`/api/properties/${id}`, payload)
        const index = this.properties.findIndex(property => property._id === id)
        if (index !== -1) {
          this.properties.splice(index, 1, data)
        }
        return data
      } catch (error) {
        console.error('Error updating property:', error.message)
        throw error
      }
    },

    //delete propery
    async deleteProperty(id) {
      try {
        await useApi().delete(`/api/properties/${id}`)
        this.properties = this.properties(property => property._id !== id)
      } catch (error) {
        console.error('Error deleting property:', error.message)
        throw error
      }
    },

    //toggle like
    async toggleLike(id) {
      try {
        const { data } = await useApiPrivate().post(
          `/api/properties/${id}/like`,
        )
        const porpertyIndex = this.properties.findIndex(
          property => property._id === id,
        )

        if (porpertyIndex !== -1) {
          this.properties[porpertyIndex].likes = data.likes
        }
        return data
      } catch (error) {
        console.error('Error toggling like:', error.message)
        throw error
      }
    },
  },
})
