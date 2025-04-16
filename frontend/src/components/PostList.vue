<template>
  <div class="container mt-4">
    <h3>Your Posts</h3>
    <button class="btn btn-success mb-3" @click="$router.push('/posts/new')">New Post</button>
    <div v-for="post in posts" :key="post.id" class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text">{{ post.content }}</p>
        <button class="btn btn-warning me-2" @click="editPost(post)">Edit</button>
        <button class="btn btn-danger" @click="deletePost(post.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return { posts: [] }
  },
  mounted() {
    this.fetchPosts()
  },
  methods: {
    async fetchPosts() {
      const res = await axios.get('http://localhost:3000/api/posts', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      this.posts = res.data
    },
    editPost(post) {
      this.$router.push(`/posts/edit/${post.id}`)
    },
    async deletePost(id) {
      await axios.delete(`http://localhost:3000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      this.fetchPosts()
    }
  }
}
</script>
