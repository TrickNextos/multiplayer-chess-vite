<template>
  <div v-if="moving_position" style="width: 100%; height: 100%; position: relative;" @mousemove="onMouseMove"
    @mouseup="onMouseUp" ref='chessboard_dimensions'>
    <div v-for='move in props.moves' class='chessboard-move'
      :style="{ transform: setPosition(array2_orientation([move[0] * 100, move[1] * 100], 700)) }" 
      >
      <div />
    </div>
    <div class="chessboard-piece" @mousemove="onMouseMove"
      :style="{ background: getUrl(props.filename + '.svg'), transform: setPosition(moving_position), }"
      style="z-index: 5;" />
  </div>
  <div v-else class="chessboard-piece" @mousedown="onMouseDown"
    :style="{ background: getUrl(props.filename + '.svg'), transform: setPosition(array2_orientation(props.position, 700)), }" />
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  filename: String,
  position: Array,
  moves: Array,
  chessboard_dimensions: {
    dimensions: Array,
    offset: Array,
  },
  orientation: Number,
})
const emit = defineEmits({
  move: Array,
})

console.log('piece init')

let moving_position = ref(null)

// white and black are mirrored
function fix_orientation(n, max) {
  console.log(n)
  console.log(props.orientation)
  if (props.orientation  == 'white') {
    return n
  }
  return max-n
}

function array2_orientation(arr, max) {
  return [fix_orientation(arr[0], max), fix_orientation(arr[1], max)]
  
}


function onMouseDown(event) {
  let mouse_coordinates = getMouseCoordinates(event)
  moving_position.value = getPositionPercentage(mouse_coordinates, props.chessboard_dimensions)

}

function onMouseMove(event) {
  if (!moving_position.value) {
    return
  }

  let mouse_coordinates = getMouseCoordinates(event)
  moving_position.value = getPositionPercentage(mouse_coordinates, props.chessboard_dimensions)
}

function onMouseUp(event) {
  let mouse_coordinates = getMouseCoordinates(event)
  let new_position = getPositionSquare(mouse_coordinates, props.chessboard_dimensions)
  moving_position.value = null
  console.log()
  emit('move', array2_orientation(new_position, 7))
}

function getPositionPercentage(mouse_coordinates, chessboard_element_data) {
  let position = [
    (mouse_coordinates[0] - chessboard_element_data.offset[0]) / chessboard_element_data.dimensions[0] * 800 - 50,
    (mouse_coordinates[1] - chessboard_element_data.offset[1]) / chessboard_element_data.dimensions[1] * 800 - 50,
  ]
  return position
}

function getPositionSquare(mouse_coordinates, chessboard_element_data) {
  return [
    ~~((mouse_coordinates[0] - chessboard_element_data.offset[0]) / chessboard_element_data.dimensions[0] * 8),
    ~~((mouse_coordinates[1] - chessboard_element_data.offset[1]) / chessboard_element_data.dimensions[1] * 8),
  ]
}

function getMouseCoordinates(event) {
  return [
    event.clientX,
    event.clientY,
  ]
}

function getUrl(filename) {
  return 'url(/src/assets/img/' + filename + ')'
}

function setPosition(position) {
  return 'translate(' + position[0] + '%, ' + position[1] + '%)'
}

</script>
