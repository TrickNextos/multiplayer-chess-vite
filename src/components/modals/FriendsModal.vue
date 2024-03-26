<template>
  <div class="modal">
    <h2>Friends</h2>
    <hr><br>
    <div class="d-flex container" style="gap: 3em;">
      <div>
        <h3>Current friends</h3>
        <div class="friends_list">
          <div class="scrollable overflow-y-hidden" style="height: 80%;">

            <div :key="friend" v-for="friend in friends_list" @click="() => remove_friend_id = friend.id">
              <span v-if="friend.id == remove_friend_id" style="background-color: red">
                {{ friend.username }}
              </span>
              <span v-else>
                {{ friend.username }}
              </span>

            </div>
          </div>
        </div>
        <br>
        <span class="btn" @click="() => remove_friend(remove_friend_id)">
          Remove a friend
        </span>
      </div>
      <div style="flex:1;">
        <h3>Add a friend</h3>

        <div class="friends_list">
          <div class="scrollable overflow-y-hidden" style="height: 80%;">

            <div :key="pos_friend" v-for="pos_friend in possible_friends" @click="() => add_friend_id = pos_friend.id">
              <span v-if="pos_friend.id == add_friend_id" style="background-color: red">
                {{ pos_friend.username }}
              </span>
              <span v-else>
                {{ pos_friend.username }}
              </span>

            </div>
          </div>
        </div>
        <br>
        <span class="btn" @click="() => add_friend(add_friend_id)">
          Add a friend
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { popModal } from 'jenesius-vue-modal';
import axios from '../../plugins/axios';

// let resp = axios.post('social/', { id: 3 }).catch(() => { })
// console.log(resp)

let remove_friend_id = ref(undefined)
let add_friend_id = ref(undefined)

let friends_list = ref([])
let possible_friends = ref([])

function fetch_data() {
  axios.get('social/').then(resp => {
    friends_list.value = resp.data.info
  })
  axios.get('social/possible_friends').then(resp => {
    possible_friends.value = resp.data.info
  })
}

function remove_friend(id: number) {
  if (!remove_friend_id.value) {
    return
  }
  remove_friend_id.value = undefined
  axios.delete('social/' + id).then(() => {
    fetch_data()
  })
}

function add_friend(id: number) {
  if (!add_friend_id.value) {
    return
  }
  add_friend_id.value = undefined
  axios.post('social/', { id: id, msg_type: "New" }).then(() => {
    fetch_data()
  })
}

onMounted(async () => {
  fetch_data()
})


</script>

<style>
.play-with {
  gap: 2em;
}

.play-with>* {
  flex: 1;
}

.friends_list {
  border: 1px solid var(--color-border);
  border-radius: 1em;
  padding: 0.5em;
}

.container {
  padding: 1em;
}
</style>
