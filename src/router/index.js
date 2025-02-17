import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/Auth/UserView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth/LoginView.vue'),
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/Auth/LogoutView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Auth/RegisterView.vue'),
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/Auth/ForgotPasswordView.vue'),
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('../views/Auth/ResetPasswordView.vue'),
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      component: () => import('../views/Auth/VerifyEmailView.vue'),
    },
    {
      path: '/resend-email-verification',
      name: 'resend-email-verification',
      component: () => import('../views/Auth/ResendEmailVerificationView.vue'),
    },

  ],
})

export default router
