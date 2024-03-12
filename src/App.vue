<script setup>
import { RouterView } from 'vue-router'

import {container} from "jenesius-vue-modal";
</script>

<template>
  <div style="width: 100%;">
    <RouterView />
    
    <container />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>

