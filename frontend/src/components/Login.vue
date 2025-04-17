<template>
  <div class="container mt-5">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label class="form-label">Username</label>
        <input v-model="username" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" v-model="password" class="form-control" required />
      </div>
      <button class="btn btn-primary">Login</button>
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
    async login() {
      const res = await axios.post('http://localhost:3000/api/auth/login', {
  username: this.username,
  password: this.password
}, {
  withCredentials: true
})

      this.$router.push('/')
    }
  }
}
</script>
