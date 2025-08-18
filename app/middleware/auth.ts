import { useAuthStore } from "~/store/auth";

// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { token, user } = useAuthStore();
  
  // If no token or user, redirect to login
  if (!token || !user) {
    return navigateTo('/auth/login');
  }
});