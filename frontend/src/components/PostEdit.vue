<template>
    <div class="container mt-5">
      <h2>แก้ไขโพสต์</h2>
      <form @submit.prevent="editPost">
        <div class="mb-3">
          <label class="form-label">หัวข้อ</label>
          <input v-model="title" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">คำอธิบาย</label>
          <textarea v-model="content" class="form-control" required></textarea>
        </div>
        <button class="btn btn-primary">แก้ไข</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import { ref, onMounted } from 'vue'
  import { useAuthStore } from '@/stores/auth'

  export default {

    props: ['id'],
    data() {
      return {
        title: '',
        content: '',
      }
    },
    async created() {

      const res = await axios.get(`http://localhost:3000/api/posts/${this.id}` ,{
          withCredentials: true,
        })
      this.title = res.data.title
      this.content = res.data.content
    },
    methods: {
      async editPost() {
        const authStore = useAuthStore()
        const token = localStorage.getItem('token') // ใช้ token ถ้ามี
  
        try {
          const res = await axios.put(
            `http://localhost:3000/api/posts/${this.id}`,
            {
              title: this.title,
              content: this.content,
            },
            {
              withCredentials: true, // ตั้งค่า withCredentials ในตัวเลือกของคำขอ
            }
          )
          alert('แก้ไขสำเร็จ')
          this.$router.push('/posts') // เปลี่ยนไปที่หน้าแสดงโพสต์ทั้งหมด
        } catch (error) {
          console.error(error)
          alert('มีข้อผิดพลาด')
        }
      }
    }
  }
  </script>
  