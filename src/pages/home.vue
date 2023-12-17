<template>
  <div class="overflow-y-hidden"></div>
  <div class="header d-flex">
    <h3>Welcome {{username}}</h3>
    <div class="btn" @click="useAuthStore().logout()">Logout</div>
  </div>
  <div class="d-flex w-100">
    <div class="menu">
      Games: 
    </div>
    <main style="flex: 1;">
      <ChessArea class="w-100"/>
    </main>
  </div>
</template>

<script setup>
import ChessArea from '@/components/Chessboard/ChessArea.vue'
import {onMounted, ref} from 'vue'
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore()
const username = ref('')

onMounted(async () => {
  username.value = await auth.get_username()
})

</script>


<style>
.menu {
  background-color: var(--background-color);
  width: fit-content;
  padding: 2em;
  height: 90vh;
  background-color: var(--color-background);
}

.header {
  background-color: var(--color-background);
  height: 10vh;
  justify-content: space-between;
  align-items: center;
  padding: 0 2em ;

}
</style>
