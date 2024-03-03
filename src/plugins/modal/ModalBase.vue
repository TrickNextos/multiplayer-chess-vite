<template>
  <div v-show="modal_store.active()" class="modal-container" @click="close_last_modal">
    <div 
      id="modal-background"
      :style="{
        'z-index': modal_minimum_z_index + 2 * modal_store.modalState.length - 3
      }"
    />
    <div 
      v-for="([modal, _res_ref], index) in modal_store.modalState" 
      @click="() => {}"
      :style="{
        'z-index': modal_minimum_z_index + 2 * index
      }"
      class="modal"
      @close-modal="() => {console.log('1276451246')}"
    >
      <div v-if="modal.title">
        <h2 style="padding-bottom: 1em;">{{ modal.title }}</h2>
        <hr><br>
      </div>
      <component 
      v-for="component_node in modal.inner" 
      :is="component_node" 
      @click=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from '../../stores/modal';

const modal_minimum_z_index = 100;


let modal_store = useModalStore()

function close_last_modal(e) {
  // close only if clicked outside of modal
  if (e.target.id == 'modal-background') {
    modal_store.pop_modal()
  }
}

function close_modal() {
  console.log("WOWOOWOW")
    modal_store.pop_modal()
}

</script>

<style>
.modal-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: #22222284;

  text-align: center;
}

.modal {
  position: absolute;

  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);

  background-color: var(--color-background-mute);
  padding: 2em;
  border: 1px var(--color-border) solid;
  border-radius: 1em;
}

#modal-background {
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: #22222284;
}
</style>