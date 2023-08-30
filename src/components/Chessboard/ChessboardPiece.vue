<template>
  <div v-if="moving_position" style="width: 100%; height: 100%; position: relative;" @mousemove="onMouseMove"
    @mouseup="onMouseUp" ref='chessboard_dimensions'>
    <div class="chessboard-piece" @mousemove="onMouseMove" @mouseup="onMouseUp"
      :style="{ background: getUrl(props.filename), transform: setPosition(moving_position), }" style="z-index: 5;" />
  </div>
  <div v-else class="chessboard-piece" @mousedown="onMouseDown"
    :style="{ background: getUrl(props.filename), transform: setPosition(props.position), }" />
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  filename: String,
  position: Array,
  chessboard_dimensions: {
    dimensions: Array,
    offset: Array,
  },
})
const emit = defineEmits({
  move: Array,
})

console.log('piece init')

let moving_position = ref(null)


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
  emit('move', new_position)
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
