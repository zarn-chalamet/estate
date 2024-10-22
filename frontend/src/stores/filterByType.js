import { defineStore } from 'pinia'

export const useFilterByType = defineStore('type', {
  state: () => ({
    propertyType: '',
  }),
  actions: {
    setPropertyType(type) {
      this.propertyType = type
    },
  },
})
