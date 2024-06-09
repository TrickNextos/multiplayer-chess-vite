<template>
  <div class="modal">
    <h2>New game</h2>
    <hr><br>
    <form action="" @submit.prevent="">
      <div class="d-flex play-with">
        <div>
          <div>

            <h3>Play with random people around the world</h3>
            <br>
            <input type="submit" class="btn" value="Play now" @click="() => {
      props.new_game({
        game_type: 'Multiplayer',
      })
      popModal()
    }">
          </div>
          <br>
          <hr>

          <div>
            <h3>Play singleplayer</h3>
            <br>
            <input type="submit" class="btn" value="Play now" @click="() => {
      props.new_game({
        game_type: 'Singleplayer',
      })
      popModal()
    }">
          </div>
        </div>
        <div>
          <h3>Play with friends</h3>
          <select v-model="friend_id">
            <option disabled value="">Choose a friend</option>
            <option v-for="friend in friends" :key="friend" :value="friend.id">{{ friend.username }}</option>
          </select>
          <!-- <br> -->
          <!-- <br> -->
          <!-- <span class="btn" @click="() => openModal(FriendsModal)"> -->
          <!--   View friend settings -->
          <!-- </span> -->

          <br><br>
          <input type="submit" class="btn" value="Play now" :disabled="!friend_id" @click="() => {
      if (!friend_id) {
        return
      }
      props.new_game({
        game_type: 'Multiplayer',
        opponent: friend_id,
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
import { popModal, openModal } from 'jenesius-vue-modal';
import axios from '../../plugins/axios';


const props = defineProps<{
  ws: WebSocket,
  new_game: (game_options: GameOptions) => void,
}>()

console.log(props)

const friends = ref(undefined)
const friend_id = ref('')


onMounted(async () => {
  console.log(props)
  friends.value = await axios.get('social/profile').then(resp => {
    console.log(resp)
    return resp.data.friends
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
