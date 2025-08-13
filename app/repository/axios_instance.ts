// import { useRuntimeConfig } from '@/composables/useRuntimeConfig';
import axios from 'axios';
import { useAuthStore } from '~/store/auth';

const config = useRuntimeConfig();
const axiosInstance = axios.create({
  // baseURL: config.apiBaseUrl || 'https://localhost:8000',
  baseURL: config.public.apiBaseUrl ,
  // timeout: 10000,
});

// Add a request interceptor to include Authorization token and headers
axiosInstance.interceptors.request.use(
  (config) => {
    //   const token = localStorage.getItem('authToken'); // Replace with your token retrieval logic
    const token = localStorage.getItem('token') ?? '';

    const authStore = useAuthStore();
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // config.headers['X-Requested-With'] = 'XMLHttpRequest';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
