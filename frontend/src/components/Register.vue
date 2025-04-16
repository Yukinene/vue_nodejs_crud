<template>
  <div class="container mt-5">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label class="form-label">Username</label>
        <input v-model="username" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" v-model="password" class="form-control" required />
      </div>
      <button class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return { username: '', password: '' }
  },
  methods: {
    async register() {
      await axios.post('http://localhost:3000/api/auth/register', {
        username: this.username, password: this.password
      })
      this.$router.push('/login')
    }
  }
}
</script>
