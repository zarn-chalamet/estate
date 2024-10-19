import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchQuery: '', // The search query
  }),
  actions: {
    setSearchQuery(query) {
      this.searchQuery = query
    },
  },
})
