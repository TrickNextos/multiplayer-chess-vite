<template>

  <div class="header d-flex">
    <h3>Welcome {{username}}</h3>
    <div class="btn" @click="auth.logout()">Logout</div>
  </div>
  woow
  <div class="about">
    <h1>This is an about page</h1>
    <hr>
    {{ neki }}
    {{ info }}
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'
import axios from '@/plugins/axios';
let auth = useAuthStore()

const username = ref('')

let neki = ref(auth.user)
let info = ref('')

onMounted(async () => {
  username.value = await auth.get_username()
  await axios.get('social').then(resp => {
    info.value = resp.data
  })
})

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
