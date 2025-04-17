import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import PostList from '@/components/PostList.vue'
import PostForm from '@/components/PostForm.vue'
import PostEdit from '@/components/PostEdit.vue'
import Home from '@/components/Home.vue'

import { isLoggedIn } from '@/services/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/posts',
    name: 'PostList',
    component: PostList
  },
  {
    path: '/posts/create',
    name: 'CreatePost',
    component: PostForm
  },
  {
    path: '/posts/:id/edit',
    component: PostEdit,
    props: true  
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router