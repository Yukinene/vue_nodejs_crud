import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import PostList from '@/components/PostList.vue'
import PostForm from '@/components/PostForm.vue'
import Welcome from '@/components/Welcome.vue'

import { isLoggedIn } from '@/services/auth'

const routes = [
  { path: '/', component: Welcome },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/posts',
    component: PostList,
    meta: { requiresAuth: true }
  },
  {
    path: '/posts/new',
    component: PostForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/posts/edit/:id',
    component: PostForm,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next('/login')
  } else {
    next()
  }
})

export default router
