<template>
  <div class='main-area'>
    <Chessboard :pieces="pieces" @move='processMove' />
    <div style="flex: 1;">
      Testing window
    </div>
  </div>
</template>

<script setup>
import Chessboard from '@/components/Chessboard/Chessboard.vue'

function processMove(smth, neki) {
  console.log(smth, neki)

}

// get it from the backend, only for testing
let pieces = [
  {
    filename: "br.png",
    position: [1, 4],
  },
  {
    filename: "wk.png",
    position: [6, 2],
  }
]
</script>

<style>
.main-area {
  display: flex;
  gap: 1em;
  width: 80%;
  margin: 0 auto;
}
</style>
