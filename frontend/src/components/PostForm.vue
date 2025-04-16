<template>
  <div class="container mt-4">
    <h3>{{ isEdit ? 'Edit Post' : 'New Post' }}</h3>
    <form @submit.prevent="savePost">
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input v-model="title" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Content</label>
        <textarea v-model="content" class="form-control" rows="5" required></textarea>
      </div>
      <button class="btn btn-primary">{{ isEdit ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return { title: '', content: '', isEdit: false }
  },
  async mounted() {
    const id = this.$route.params.id
    if (id) {
      this.isEdit = true
      const res = await axios.get(`http://localhost:3000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      this.title = res.data.title
      this.content = res.data.content
    }
  },
  methods: {
    async savePost() {
      const payload = { title: this.title, content: this.content }
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      if (this.isEdit) {
        const id = this.$route.params.id
        await axios.put(`http://localhost:3000/api/posts/${id}`, payload, config)
      } else {
        await axios.post('http://localhost:3000/api/posts', payload, config)
      }
      this.$router.push('/posts')
    }
  }
}
</script>
