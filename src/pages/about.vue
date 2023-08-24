<template>
  <div class="about">
    <h1>This is an about page</h1>
    <hr>
    {{ neki }}
    <div @click="onClick()">
      test
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
let auth = useAuthStore()

let neki = ref(auth.user)

let onClick = () => {
  auth.logout()
}
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
