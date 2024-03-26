<template>
  <div style="overflow-y: hidden;">
    <div class='main-area'>
      <div v-if="!Object.keys(games).length" style="flex: 1; position: relative;">
        <div class="btn center-absolute" @click="() => openModal(NewGameModal, { ws: ws })">New game</div>
      </div>
      <Chessboard v-else-if="games[current_game] != undefined" :pieces="games[current_game].pieces"
        @move='processMove' />
      <div v-else style="flex: 1;">wrong game selected</div>
      <div class="side-bar">
        <div class="chess-moves scrollable">
          <table v-if="current_game">
            <tr>
              <th>White</th>
              <th>Black</th>
            </tr>
            <tr v-if="games[current_game]" :key="chess_move" v-for="chess_move in games[current_game].moves">
              <td v-for="move in chess_move" :key="move" style="text-align: center; height: fit-content;">
                {{ move }}
              </td>
            </tr>
          </table>
        </div>
        <div class="chess-chat">
          <div class="chess-chat-text scrollable">
            <p v-if="current_game" :key="chat" v-for="chat in games[current_game].chat" v-html="chat" />
          </div>
          <form class="chess-chat-input" @submit.prevent="send_text">
            <input type="text" name="" id="" class="typing" v-model="current_text">
            <input class="btn text-submit" value="Send" type="submit">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Chessboard from './Chessboard.vue'
import { ref } from 'vue'
import NewGameModal from '../modals/NewGameModal.vue'
import { useNotificationStore } from '../../stores/notification';
import { openModal } from 'jenesius-vue-modal';
import { useInboxStore } from '../../stores/inbox.ts'

const emit = defineEmits(['new_game'])
let notification_store = useNotificationStore()

let selected = ref('')

const { ws } = defineProps<{
  ws: WebSocket
}>()


function processMove(from_position: [number, number], to_position: [number, number]) {
  if (JSON.stringify(from_position) == JSON.stringify(to_position)) {
    return
  }
  ws.send(JSON.stringify({
    game_id: current_game.value,
    action: 'move',
    data: JSON.stringify({
      from: from_position,
      to: to_position,
    }),
  }))

}


let current_game = ref(null)
let games = ref(new Object)

let current_text = ref('')
function send_text() {
  if (current_text.value != '') {
    ws.send(JSON.stringify({
      game_id: current_game.value,
      action: 'chat',
      data: current_text.value,
    }))
    console.log(games.value[current_game.value].chat)
    add_to_chat("Me", current_text.value, current_game.value)
    current_text.value = ''
  }
}


function switch_game(game_id) {
  current_game.value = game_id
}
function get_current_game() {
  return current_game.value
}
defineExpose({ switch_game, get_current_game })


let index = 0

const inboxStore = useInboxStore()

ws.onmessage = (msg) => {
  console.log("Got message from ws: ", msg)
  let data = JSON.parse(msg.data);
  console.log(data)
  if (data.action == 'move') {
    // games.value[data.game_id].pieces = JSON.parse(data.data)
    games.value[data.game_id].pieces = data.data

    index += 1
  }
  else if (data.action == 'chat') {
    console.log(games.value[data.game_id].chat)
    add_to_chat("Opponent", data.data, data.game_id)
  }
  else if (data.action == 'move info') {
    add_to_moves(data.data, data.game_id)
  }
  else if (data.action == 'init') {
    if (data.data.new_game) {
      notification_store.success("New game with " + data.data.opponent.username + " started")
    }
    games.value[data.game_id] = {
      pieces: undefined,
      chat: [],
      moves: [[]], // moves will be added a bit later
      username: data.data.opponent.username,
    }
    console.log('data.game_id in ws', data.game_id)
    emit('new_game', data.game_id, data.data.opponent.username)
    current_game.value = data.game_id

    for (let i = 0; i < data.data.moves.length; i++) {
      add_to_moves(data.data.moves[i], data.game_id)
    }
    for (let i = 0; i < data.data.chat.length; i++) {
      let player = data.data.chat[i][0] ? "Me" : "Opponent"
      add_to_chat(player, data.data.chat[i][1], data.game_id)
    }

    index += 1
  }
  else if (data.action == 'friend request') {
    inboxStore.friendRequests.push(data.data)
    console.log(inboxStore.friendRequests)
  }
  else {
    console.log("wrong ws message action")
  }
}

function add_to_moves(move, game_id) {
  let move_length = games.value[game_id].moves.length
  let last_move_pair = games.value[game_id].moves[move_length - 1]

  if (last_move_pair.length == 1) {
    last_move_pair.push(move)
  }
  else {
    games.value[game_id].moves.push([move])
  }
}
function add_to_chat(player, chat, game_id) {
  games.value[game_id].chat.splice(0, 0, '<b>' + player + ': </b> ' + chat)
}
</script>

<style>
.main-area {
  padding: 2.5vh;
  display: flex;
  justify-content: end;
  gap: 1em;
  margin: 0 auto;
  height: 90vh;
}

.side-bar {
  max-width: 30vw;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1em;
}
</style>
