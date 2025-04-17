<template>
    <div class="container mt-5">
      <div class="text-center">
        <h1 class="display-4">Welcome</h1>
        <p class="lead">Vue 3 + Node.js CRUD with User Authentication</p>
  
        <div v-if="authStore.user == null" class="mt-4">
          <router-link to="/login" class="btn btn-primary me-2">Login</router-link>
          <router-link to="/register" class="btn btn-success">Register</router-link>
        </div>
        <div v-else class="mt-4">
          <router-link to="/posts" class="btn btn-outline-secondary">PostList</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios'
  import { useAuthStore } from '../stores/auth'
  import { computed } from 'vue'
  axios.get('http://localhost:3000/api/auth/user', {
  withCredentials: true
})


  const authStore = useAuthStore()
  const isUser = computed(() => authStore.fetchUser)
  
  const isLoggedIn = computed(() => authStore.isLoggedIn)
  
  </script>
  