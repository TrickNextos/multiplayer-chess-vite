<template>
  <div class="modal" style="width: min(30em, 50%);">
    <h3>Inbox</h3>
    <hr>
    <br>
    <div v-if="inboxStore.friendRequests.length" class="msg">
      <div v-for="(req, index) in inboxStore.friendRequests" class="d-flex"
        style="justify-content: space-between; align-items: center;">
        {{ req.user.username }}
        <div class="d-flex">
          <span class="btn" @click="acceptFriend(req, index)">Accept</span>
          <span class="btn" @click="rejectFriend(req, index)"
            style="background-color: red; margin-left:0.3em;">Decline</span>
        </div>
      </div>
    </div>
    <div v-else>
      Inbox is empty
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInboxStore, FriendRequest } from '../../stores/inbox.ts'
import axios from '../../plugins/axios.js'

const inboxStore = useInboxStore()

const { ws } = defineProps<{
  ws: WebSocket
}>()

function sendFriendToBackend(req: FriendRequest, accept: bool, index: number) {
  console.log("should send")
  axios.post('social/', {
    id: req.user.id,
    request_id: req.request_id,
    msg_type: accept ? 'Accept' : 'Reject',
  }).then(() => {
    console.log("huh")
    console.log(inboxStore.friendRequests)
    inboxStore.friendRequests.splice(index, 1)
    console.log(inboxStore.friendRequests[index])
    console.log(inboxStore.friendRequests)
  })
}

function acceptFriend(request: FriendRequest) {
  sendFriendToBackend(request, true)
}

function rejectFriend(request: FriendRequest) {
  sendFriendToBackend(request, false)
}

</script>

<style>
.msg {
  padding: 0.5em;
  border: 1px solid var(--color-border);
  border-radius: 1em;
}

.msg>* {
  margin-bottom: 0.5em;
}

.msg>*:last-child {
  margin-bottom: 0;
}
</style>
