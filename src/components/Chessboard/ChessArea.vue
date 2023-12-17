<template>
  <div style="overflow-y: hidden;">
    <div class='main-area' :id="index">
      <Chessboard :pieces="pieces" @move='processMove' />
      <div class="side-bar">
        <div class="chess-moves scrollable">
          <table>
            <tr>
              <th>White</th>
              <th>Black</th>
            </tr>
            <tr v-for="chess_move in chess_moves">
              <td v-for="move in chess_move" style="text-align: center; height: fit-content;">
                {{ move }}
              </td>
            </tr>
          </table>
          </div>
        <div class="chess-chat">
          <div class="chess-chat-text scrollable">
            <p v-for="chat in chat_data" v-html="chat" />
          </div>
          <form class="chess-chat-input" @submit="send_text">
            <input type="text" name="" id="" class="typing" v-model="current_text">
            <input class="btn text-submit" value="Send" type="submit">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Chessboard from '@/components/Chessboard/Chessboard.vue'
import { useAuthStore } from '@/stores/auth'
import { ref, toRaw } from 'vue'

function processMove(from_position, to_position) {
  if (JSON.stringify(from_position) == JSON.stringify(to_position)) {
    return
  }
  ws.send(JSON.stringify({
    action: 'move',
    data: JSON.stringify({
      from: from_position,
      to: to_position,
    }),
  }))

}

let current_text = ref('')
let chat_data = ref([])
function send_text(e) {
  if (current_text.value != '') {
    ws.send(JSON.stringify({
      action: 'chat',
      data: current_text.value,
    }))
    chat_data.value.splice(0, 0,'<b>Me: </b>' + current_text.value)
    current_text.value = ''
  }

  e.preventDefault()
}


let chess_moves = ref([[]])

let index = 0
console.log("happens i guess")

let auth_store = useAuthStore()
const ws = new WebSocket('ws://localhost:5678/game/ws/' + auth_store.userId)
// const ws = new WebSocket('ws://localhost:5678/game/ws')

ws.onmessage = (msg) => {
  console.log("Got message from ws: ", msg)
  let data = JSON.parse(msg.data);
  if (data.action == 'move') {
    pieces.value = JSON.parse(data.data)
    
    index += 1
  }
  else if (data.action == 'chat') {
    chat_data.value.splice(0, 0, data.data)
  }
  else if (data.action == 'move info') {
    let move_length = chess_moves.value.length
    let last_move_pair = chess_moves.value[move_length - 1]
    console.log(chess_moves.value[0])

    if (last_move_pair.length == 1) {
      last_move_pair.push(data.data)
    }
    else {
      chess_moves.value.push([data.data])
    }
  }
}

let pieces = ref([])
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
