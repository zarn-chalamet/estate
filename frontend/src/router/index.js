import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/auth/LoginPage.vue'
import RegisterPage from '@/views/auth/RegisterPage.vue'
import CreateProperty from '@/views/CreateProperty.vue'
import WelcomeView from '../views/WelcomeView.vue'
import HomeView from '@/views/HomeView.vue'
import PropertyDetails from '@/views/PropertyDetails.vue'
import ProfileView from '@/views/ProfileView.vue'
import WishList from '@/views/WishList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: WelcomeView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterPage,
    },
    {
      path: '/create-property',
      name: 'CreateProperty',
      component: CreateProperty,
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/properties/:id',
      name: 'PropertyDetails',
      component: PropertyDetails,
      props: true,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileView,
    },
    {
      path: '/wishlist',
      name: 'WishList',
      component: WishList,
    },
  ],
})

export default router
