<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light px-4">
    <router-link class="navbar-brand" to="/">MyBlog</router-link>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav me-auto">
        <li class="nav-item" v-if="isLoggedIn">
          <router-link class="nav-link" to="/posts">Posts</router-link>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li v-if="!isLoggedIn" class="nav-item">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li v-if="!isLoggedIn" class="nav-item">
          <router-link class="nav-link" to="/register">Register</router-link>
        </li>
        <li v-if="isLoggedIn" class="nav-item">
          <button class="btn btn-outline-danger" @click="logout">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { isLoggedIn, logout } from '../services/auth'

export default {
  computed: {
    isLoggedIn() {
      return isLoggedIn()
    }
  },
  methods: {
    logout() {
      logout()
      this.$router.push('/login')
    }
  }
}
</script>
