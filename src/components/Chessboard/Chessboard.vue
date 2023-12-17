<template>
  <div id='chessboard'>
    <ChessboardPiece v-for='piece in pieces' :filename='piece.filename'
      :position="[piece.position[0] * 100, piece.position[1] * 100]" :chessboard_dimensions='chessboard_dimensions'
      :moves='piece.moves' @move="(new_pos) => $emit('move', piece.position, new_pos)" />

  </div>
</template>

<script setup>
import ChessboardPiece from '@/components/Chessboard/ChessboardPiece.vue'
import { onMounted, ref } from 'vue';

console.log('chessboard init')

const props = defineProps({
  pieces: Array,
});

const chessboard_dimensions = ref(null)

function getChessboardDimensions() {
  let chessboard = document.getElementById('chessboard')
  chessboard_dimensions.value = {
    dimensions: [
      chessboard.clientWidth,
      chessboard.clientHeight,
    ],
    offset: [
      chessboard.offsetLeft,
      chessboard.offsetTop,
    ]
  }
}

onMounted(() => {
  getChessboardDimensions()
  window.addEventListener("resize", getChessboardDimensions)
})

</script>

