import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', () => {

  const pageTitle = ref<string>('')

  return {
    pageTitle
  }
})