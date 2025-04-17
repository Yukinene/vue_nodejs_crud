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
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    }
  },
  methods: {
    submitRegister() {
      this.$store
        .dispatch('register', { username: this.username, password: this.password })
        .then(() => {
          this.$router.push('/login')
        })
        .catch((error) => {
          this.errorMessage = 'An error occurred. Please try again.'
        })
    },
  },
}
</script>