<template>
  <div @click="() => { 
      useModalStore().pop_modal()
      }">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from '../../stores/modal';
</script>