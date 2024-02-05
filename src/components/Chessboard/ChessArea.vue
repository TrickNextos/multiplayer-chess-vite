<template>
  <div style="overflow-y: hidden;">
    <div class='main-area' :id="index">
      <div v-if="!Object.keys(games).length" style="flex: 1; display: relative;">
        {{ Object.keys(games).length }}
        <form @submit="new_game">
          <input type="submit" value="Send">
        </form>
      </div>
      <Chessboard v-else-if="games[current_game] != undefined" :pieces="games[current_game].pieces" @move='processMove' />
      <div v-else style="flex: 1;">wrong game selected</div>
      <div class="side-bar">
        <div class="chess-moves scrollable">
          <table v-if="current_game">
            <tr>
              <th>White</th>
              <th>Black</th>
            </tr>
            <tr v-if="games[current_game]" v-for="chess_move in games[current_game].moves">
              <td v-for="move in chess_move" style="text-align: center; height: fit-content;">
                {{ move }}
              </td>
            </tr>
          </table>
          </div>
        <div class="chess-chat">
          <div class="chess-chat-text scrollable">
            <p v-if="current_game" v-for="chat in games[current_game].chat" v-html="chat" />
          </div>
          <form class="chess-chat-input" @submit="send_text">
            <input type="text" name="" id="" class="typing" v-model="current_text">
            <input class="btn text-submit" value="Send" type="submit">
          </form>
        </div>
      </div>
    </div>
    {{ games }}
  </div>
</template>

<script setup>
import Chessboard from '@/components/Chessboard/Chessboard.vue'
import { useAuthStore } from '@/stores/auth'
import { ref, defineExpose, defineEmits } from 'vue'

const emit = defineEmits(['new_game'])


function processMove(from_position, to_position) {
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
function send_text(e) {
  if (current_text.value != '') {
    ws.send(JSON.stringify({
      game_id: current_game.value,
      action: 'chat',
      data: current_text.value,
    }))
    console.log(games.value[current_game.value].chat)
    games.value[current_game.value].chat.splice(0, 0,'<b>Me: </b>' + current_text.value)
    current_text.value = ''
  }

  e.preventDefault()
}

function new_game(e) {
  console.log("wow")
  ws.send(JSON.stringify({
    game_id: null,
    action: 'new_game',
    data: 'not there yet :)',
  }))
  console.log('send form data')

  if (e) { 
    e.preventDefault()
  }
}
function switch_game(game_id) {
  console.log(game_id)
  current_game.value = game_id
}
defineExpose({new_game, switch_game})


let index = 0
console.log("happens i guess")

let auth_store = useAuthStore()
const ws = new WebSocket('ws://localhost:5678/game/ws/' + auth_store.userId)
//const ws = new WebSocket('ws://localhost:5678/game/ws')

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
    games.value[data.game_id].chat.splice(0, 0, '<b>Opponent: </b> ' + data.data)
  }
  else if (data.action == 'move info') {
    let move_length = games.value[data.game_id].moves.length
    let last_move_pair = games.value[data.game_id].moves[move_length - 1]

    if (last_move_pair.length == 1) {
      last_move_pair.push(data.data)
    }
    else {
      games.value[data.game_id].moves.push([data.data])
    }
  }
  else if (data.action == 'init') {
    console.log('init happens')
    games.value[data.game_id] = {
      pieces: undefined,
      chat: [],
      moves: [[]],
      username: data.data.username,
    }
    console.log('data.game_id in ws', data.game_id)
    emit('new_game', data.game_id, data.data.username)
    current_game.value = data.game_id
    index += 1
  }
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
