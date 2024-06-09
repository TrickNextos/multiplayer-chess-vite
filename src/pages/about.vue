<template>
  <Header :ws="ws" />
  <br>
  <div class="about">
    <div>

      <h1>Chezz</h1>
      <hr>
      <p>This is a example website made for a school project. It is written using Actix-web and Vue frameworks.</p>
      
      <br>
      <p>Source code can be found on my github:
        <ul style="list-style: none;">
          <li><a href="https://github.com/TrickNextos/multiplayer-chess-vite" target="_blank">
            <i class="fa fa-github"></i>&nbsp;Vue frontend</a></li>
        <li><a href="https://github.com/TrickNextos/multiplayer-chess-api" target="_blank">
          <i class="fa fa-github"></i>&nbsp;Rust backend</a></li>
      </ul>
      </p>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'

let auth = useAuthStore()

const username = ref('')
const ws = new WebSocket('ws://localhost:5678/game/ws/' + auth.userId)

let neki = ref(auth.user)
let info = ref('')

onMounted(async () => {
  username.value = await auth.get_username()
})

</script>

<style>
.about {
  height: 80vh;
  width: 100%;
  padding: 5em;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
