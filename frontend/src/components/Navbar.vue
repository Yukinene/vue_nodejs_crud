<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">CRUD</router-link>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          
          <li v-if="user == null" class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li v-if="user == null" class="nav-item">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
          <li v-else class="nav-item">
            <button class="btn btn-outline-danger btn-sm" @click="handleLogout">
            Logout
          </button>

          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  setup() {
    const auth = useAuthStore()
    const router = useRouter()

    const handleLogout = async () => {
      await auth.logout()
      await auth.fetchUser()
      router.push('/login')
    }
    return {
      user: auth.user,
      handleLogout
    }
  }
}
</script>

<style scoped>
.navbar {
  margin-bottom: 20px;
}
</style>
