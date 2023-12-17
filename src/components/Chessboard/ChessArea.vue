<template>
  <div style="overflow-y: hidden;">
    <div class='main-area' :id="index">
      <Chessboard :pieces="pieces" @move='processMove' />
      <div class="side-bar">
        <div class="chess-moves">
        </div>
        <div class="chess-chat">
          <div class="chess-chat-text"></div>
          <form class="chess-chat-input">
            <input type="text" name="" id="" class="typing" v-model="current_text">
            <div class="btn text-submit" @click="send_text()">Send</div>
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
let send_text = () => {
  console.log(current_text.value)
  current_text.value = ''
}

let index = 0
console.log("happens i guess")

let auth_store = useAuthStore()
const ws = new WebSocket('ws://localhost:5678/game/ws/' + auth_store.userId)
// const ws = new WebSocket('ws://localhost:5678/game/ws')

ws.onmessage = (msg) => {
  console.log("Got message from ws: ", msg)
  pieces.value = JSON.parse(JSON.parse(msg.data).data)
  console.log(pieces)
  index += 1
}
// get it from the backend, only for testing
let pieces = ref([
  {
    filename: "br",
    position: [1, 4],
  },
  {
    filename: "wk",
    position: [6, 2],
  }
])
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
