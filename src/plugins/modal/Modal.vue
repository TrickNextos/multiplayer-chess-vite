<template>
  <div
    v-show="!active || !hide_button"
    style="width: fit-content;"
    @click="open_modal()"
  >
  {{ props.close }}
    <slot name="OpenButton">
      <div class="btn">Open modal</div>
    </slot>
  </div>
</template>

<script setup lang="ts">

import { VNode, onUnmounted, ref, watch } from 'vue'
import { useModalStore, ModalNode } from '../../stores/modal';

let active = ref(undefined)
let result = ref(undefined)
let modal_store = useModalStore();

let slots = defineSlots<{
  default: () => Array<VNode> | undefined,
  OpenButton: VNode | undefined,
}>()

let props = defineProps<{
  title?: string,
  hide_button?: boolean,
  on_open?: Function,
  on_open_once?: Function,
  close?: boolean,
}>()

let opened_yet = false
function open_modal() {
  if (props.on_open_once !== undefined && !opened_yet) {
    props.on_open_once()
  }
  opened_yet = true
  if (props.on_open !== undefined) {
    props.on_open()
  }

  let modal_obj: ModalNode = {
    title: props.title,
    inner: slots.default ? slots.default() : [],
  }
  console.log(modal_obj.inner)
  active.value = modal_store.add_modal(modal_obj, result);
  result.value = undefined
}

// modal is closed
watch(result, (new_res) => {
    if (new_res != undefined) {
        active.value = undefined
    }
})

if (props.close) {
  console.log("CLOSE THE SHIT")
}



</script>