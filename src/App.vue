<script setup>
import { RouterView } from 'vue-router'
import ModalBase from '@/plugins/modal/ModalBase.vue'
</script>

<template>
  <div style="width: 100%;">
    <RouterView />
    <ModalBase />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>

