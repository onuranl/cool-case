import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import News from '../views/News.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'news',
      component: News
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

// auth middleware

router.beforeEach(async (to) => {
  const token = await localStorage.getItem('token')

  if (token && to.name === 'login') return '/'

  if (!token && to.name !== 'login') return '/login'
})

export default router
