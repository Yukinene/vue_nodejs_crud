<template>
  <div class="container mt-5">
    <h2>โพสต์ทั้งหมด</h2>

    <div v-if="auth.isLoggedIn" class="mb-3">
      <router-link to="/posts/create" class="btn btn-success">+ สร้างโพสต์ใหม่</router-link>
    </div>

    <div v-if="loading">กำลังโหลด...</div>
    <div v-else-if="posts.length === 0">ไม่มีโพสต์</div>
    
    <div v-else>
      <div v-for="post in posts" :key="post.id" class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">{{ post.title }}</h5>
          <p class="card-text">{{ post.content }}</p>
          <div v-if="auth.user?.id === post.user_id">
            <router-link :to="`/posts/${post.id}/edit`" class="btn btn-sm btn-primary">แก้ไข</router-link>
            <button @click="deletePost(post.id)" class="btn btn-sm btn-danger ms-2">ลบ</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

export default {
  setup() {
    const auth = useAuthStore()
    const posts = ref([])
    const loading = ref(true)

    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/posts/getall', {
          withCredentials: true,
        })
        posts.value = res.data
      } catch (err) {
        console.error('โหลดโพสต์ล้มเหลว:', err)
      } finally {
        loading.value = false
      }
    }

    const deletePost = async (id) => {
      if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบโพสต์นี้?')) return
      try {
        await axios.delete(`http://localhost:3000/api/posts/${id}`, {
          withCredentials: true,
        })
        posts.value = posts.value.filter(post => post.id !== id)
      } catch (err) {
        console.error('ลบโพสต์ล้มเหลว:', err)
      }
    }

      onMounted(async () => {
    await auth.fetchUser()
    await fetchPosts()
  })


    return { posts, auth, loading, deletePost }
  }
}
</script>
