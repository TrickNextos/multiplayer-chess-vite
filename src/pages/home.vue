<template>
  <div class="overflow-y-hidden"></div>
  <div class="header d-flex">
    <h3>Welcome {{username}}</h3>
    <div class="btn" @click="useAuthStore().logout()">Logout</div>
  </div>
  <div class="d-flex w-100">
    <div class="menu">
      <div class="d-flex" style="gap: 1em; align-items: center;">
        <h3>Games: </h3>
        <div class="btn" @click="chessArea.new_game(null)">New</div>
      </div>
      <div v-for="game_info in game_names" @click="chessArea.switch_game(game_info.id)">
        {{ game_info.username }}
      </div>
    </div>
    <main style="flex: 1;">
      <ChessArea class="w-100" ref="chessArea" @new_game="(i, u) => {
        console.log('in emit get',i, u)
        game_names.push({
          id: i,
          username: u,
        })
      }"/>
    </main>
  </div>
</template>

<script setup>
import ChessArea from '@/components/Chessboard/ChessArea.vue'
import {onMounted, ref} from 'vue'
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore()
const username = ref('')

const game_names = ref([])
const chessArea = ref(null)


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
