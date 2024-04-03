<template>
  <div class="header d-flex">
    <div class="header-left d-flex">
      <h3>Hello {{ username }}</h3>
      <div class="d-flex" style="gap: 1em">
        <div @click="() => openModal(FriendsModal)">Friends</div>
        <div @click="() => openModal(InboxModal, { ws })">Inbox</div>
      </div>
    </div>
    <div class="btn" @click="useAuthStore().logout()">Logout</div>
  </div>
  <div class="d-flex w-100">
    <div class="menu">
      <div class="d-flex" style="gap: 1em; align-items: center;">
        <h3>Games: </h3>
        <!-- <NewGameModal :ws="ws"/> -->

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
      <ChessArea :ws="ws" :new_game_func="new_game" class="w-100" ref="chessArea" @new_game="(i, u) => {
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
import ChessArea from '@/components/Chessboard/ChessArea.vue'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../stores/auth';
import NewGameModal from '../components/modals/NewGameModal.vue';
import { openModal } from 'jenesius-vue-modal';
import FriendsModal from '../components/modals/FriendsModal.vue'
import InboxModal from '../components/modals/InboxModal.vue';
import { GameOptions } from '../interfaces.ts'

const auth = useAuthStore()
const username = ref('')

const game_names = ref([])
const chessArea = ref(null)

const ws = new WebSocket('ws://localhost:5678/game/ws/' + auth.userId)

onMounted(async () => {
  username.value = await auth.get_username()
})

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
