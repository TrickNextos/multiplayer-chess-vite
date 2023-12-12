<template>
  <div class='main-area' :id="index">
    <Chessboard :pieces="pieces" @move='processMove' />
    <div style="flex: 1;">
      Testing window
    </div>
  </div>
  {{ pieces }}
</template>

<script setup>
import Chessboard from '@/components/Chessboard/Chessboard.vue'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

function processMove(from_position, to_position) {
  console.log(from_position, to_position)
  ws.send(JSON.stringify({
    action: 'move',
    data: JSON.stringify({
      from: from_position,
      to: to_position,
    }),
  }))

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
  display: flex;
  gap: 1em;
  width: 80%;
  margin: 0 auto;
}
</style>
