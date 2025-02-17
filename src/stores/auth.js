import { api } from '@/libs/axios';
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {

  const user = ref(null);

  const isAuthenticated = computed(() => user.value !== null);

  const fetchUser = async () => {
    const response = await api.get('/user');
    user.value = response.data;
    return response;
  }

  const register = async (data) => {
    const response = await api.post('/register', data);
    user.value = response.data.data.user;
    localStorage.setItem('token', response.data.data.token);
    return response;
  }

  const login = async (data) => {
    const response = await api.post('/login', data);
    user.value = response.data.data.user;
    localStorage.setItem('token', response.data.data.token);
    return response;
  }

  const logout = async () => {
    const response = await api.delete('/logout');
    user.value = null;
    localStorage.removeItem('token');
    return response;
  }

  const forgotPassword = async (data) => {
    return await api.post('/forgot-password', data);
  }

  const resetPassword = async (data) => {
    return await api.post('/reset-password', data);
  }

  const verifyEmail = async (data) => {
    return await api.post('/verify-email', data);
  }

  const resendEmailVerification = async () => {
    return await api.post('/resend-email-verification');
  }

  return {
    user,
    isAuthenticated,
    fetchUser,
    register,
    login,
    logout,
    verifyEmail,
    resendEmailVerification,
    forgotPassword,
    resetPassword,
  }
})
