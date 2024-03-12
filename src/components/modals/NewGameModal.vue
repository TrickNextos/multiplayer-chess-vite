<template>
  <div class="modal">
    <h2>New game</h2>
    <hr><br>
    <form action="" @submit.prevent="">
      <div class="d-flex play-with">
        <div>
          <h3>Play with random people around the world</h3>
          <br>
          <input type="submit" class="btn" value="Play now" @click="() => {
      new_game({
        type: 'multiplayer',
      })
      popModal()
    }">
        </div>
        <div>
          <h3>Play with friends</h3>
          <select v-model="friend_id">
            <option disabled value="">Choose a player</option>
            <option v-for="friend in friends" :key="friend" :value="friend.id">{{ friend.username }}</option>
          </select>

          <br><br>
          <input type="submit" class="btn" value="Play now" :disabled="!friend_id" @click="() => {
      if (!friend_id) {
        return
      }
      new_game({
        type: 'multiplayer',
        friend: friend_id,
      })
      popModal()
    }">
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { popModal } from 'jenesius-vue-modal';
import axios from '../../plugins/axios';

const props = defineProps<{
  ws: WebSocket
}>()

console.log(props)

const friends = ref(undefined)
const friend_id = ref('')


function new_game(data: object) {
  props.ws.send(JSON.stringify({
    game_id: null,
    action: 'new_game',
    data: "wow",
  }))
  console.log('send form data')
}

let resp = axios.post('social/', { id: 3 }).catch(() => { })
console.log(resp)

onMounted(async () => {
  friends.value = await axios.get('social/').then(resp => {
    console.log(resp)
    return resp.data.info
  })
})
</script>

<style>
.play-with {
  gap: 2em;
}

.play-with>* {
  flex: 1;
}
</style>
