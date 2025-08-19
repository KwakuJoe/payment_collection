// src/stores/auth.ts
import type { User } from "~/types/index";
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';


export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref<string | null>(localStorage.getItem('token') || null);
  const user = ref<any | null>(localStorage.getItem('user') || null);

  // Getters
  const isAuthenticated = computed(() => !!token.value);

  // Actions
  function setAuthItems(newToken: string, userData: User | null) {
    token.value = newToken;
    user.value = userData;

    // Persist token in localStorage
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
  }

  // get user info
   function getUser(): User | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) as User : null;
  }


  function initialize() {
    // Check for token in localStorage on app startup
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      token.value = storedToken;
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    setAuthItems,
    initialize,
    getUser
  };
});