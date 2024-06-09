<template>
  <Header :ws="ws" :new_game="new_game"/>
  <div class="d-flex w-100">
    <div class="menu">
      <div class="d-flex" style="gap: 1em; align-items: center; margin-bottom: 0.5em;">
        <h3>Games: </h3>

        <div class="btn" @click="() => openModal(NewGameModal, { ws, new_game })">New Game</div>

      </div>
      <div v-for="game_info in game_names" @click="chessArea.switch_game(game_info.id)">
        <div :class="{ 'chosen_game': chessArea.get_current_game() == game_info.id }"
          style="padding-left: 0.5em; border-left: rgba(0,0,0,0) 5px solid;">
          {{ game_info.username }}
        </div>
      </div>
    </div>
    <main style="flex: 1;">
      <ChessArea :ws="ws" :new_game="new_game" class="w-100" ref="chessArea" @new_game="(i, u) => {
        console.log('in emit get', i, u)
        game_names.push({
          id: i,
          username: u,
        })
      }" />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import { ref } from 'vue'
import ChessArea from '@/components/Chessboard/ChessArea.vue'
import NewGameModal from '../components/modals/NewGameModal.vue';
import { openModal } from 'jenesius-vue-modal';
import { GameOptions } from '../interfaces.ts'
import { useAuthStore } from '@/stores/auth';


const auth = useAuthStore()

const game_names = ref([])
const chessArea = ref(null)

const ws = new WebSocket('ws://localhost:5678/game/ws/' + auth.userId)


function new_game(game_options: GameOptions) {
  ws.send(JSON.stringify({
    game_id: null,
    action: 'new_game',
    data: game_options,
  }))
  console.log('send form data')
}

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
  padding: 0 2em;

}

.chosen_game {
  border-left: var(--color-green) 5px solid !important;
}

.header-left {
  gap: 3em;
  align-items: baseline;
}
</style>
