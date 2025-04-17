<script setup>
import { onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

onMounted(() => {
  auth.fetchUser()
})
</script>

<template>
      <Navbar />
      <RouterView />
</template>

