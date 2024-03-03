<template>
    <Modal
        title="New game"
        :loading="loading"
        :on_open_once="on_first"
        :close="close"
    >
        <form action="" @submit.prevent="() => {close = true}">
            <div class="d-flex play-with">
                <div>
                    <h3>Play with random people around the world</h3>
                    <br>
                    <CloseModal>
                        <input type="submit" class="btn" value="Play now" @click="new_game('wwooww')">
                    </CloseModal>
                </div>
                <div>
                    <h3>Play with friends</h3>
                    <select name="" id="">
                        <option v-for="friend in friends">
                            {{ friend.username }}
                        </option>
                    </select>
                </div>
            </div>
        </form>
        <Modal>
            <CloseModal>
                hi
            </CloseModal>
        </Modal>
        <template #OpenButton>
            <div class="btn">New</div>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import Modal from '../../plugins/modal/Modal.vue';
import CloseModal from "../../plugins/modal/CloseModal.vue"
import { ref } from 'vue';

let props = defineProps<{
    ws: WebSocket
}>()


let close = ref(false)
let loading = ref(true)
let friends = ref(undefined)


function new_game(type) {
  return

  props.ws.send(JSON.stringify({
    game_id: null,
    action: 'new_game',
    data: 'not there yet :)',
  }))
  console.log('send form data')
}


function on_first() {
    friends.value = [
        {
            id: 1,
            username: 'Franc',
        },
        {
            id: 2,
            username: 'Nekdo',
        },
    ]
    setTimeout(() => {
        loading.value = false
        console.log("wwow")
    }, 1000);
}

</script>

<style>
.play-with {
    gap: 2em;
}

.play-with > * {
    flex: 1;
}
</style>
