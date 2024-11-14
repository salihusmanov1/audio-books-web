import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useUserStore } from '@/stores/user'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/manage',
    name: 'manage',
    component: () => import('../views/ManageView.vue'),
    meta: { auth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-orange'
})

router.beforeEach((to, from, next) => {
  if (!to.meta.auth) {
    next()
    return
  }

  const userStore = useUserStore()
  if (userStore.userLoggedIn) {
    next()
  } else {
    next({ name: 'home' })
  }
})

export default router
