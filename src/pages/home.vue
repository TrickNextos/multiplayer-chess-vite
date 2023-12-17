<script setup>
import ChessArea from '@/components/Chessboard/ChessArea.vue'

</script>

<template>
  <div class="overflow-y-hidden"></div>
  <div class="header d-flex">
<h3>Welcome User</h3>
  </div>
  <div class="d-flex w-100">
    <div class="menu">
      Games: 
    </div>
    <main style="flex: 1;">
      <ChessArea class="w-100"/>
    </main>
  </div>
</template>


<style>
.menu {
  background-color: var(--background-color);
  width: fit-content;
  padding: 2em;
  height: 90vh;
  background-color: var(--color-background);
}

.header {
  background-color: var(--color-background);
  height: 10vh;
  justify-items: center;
  align-items: center;
  padding: 0 2em ;
}
</style>
