<template>
  <div class="modal" style="padding: 1.5em; text-align: center;">
    <h3 style="padding: 1em 3em;">Game ended</h3>
    <hr>
    <br>
    <h4>{{ msg }}</h4>
    <br>

    <span class="btn" @click="() => closeModal()">Close</span>
    <br>
  </div>
</template>

<script setup lang="ts">
import { closeModal } from 'jenesius-vue-modal';

const { msg, close } = defineProps({
  msg: String,
});

</script>
