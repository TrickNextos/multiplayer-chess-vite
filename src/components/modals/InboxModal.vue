<template>
  <div class="modal" style="width: min(30em, 50%);">
    <h3>Inbox</h3>
    <hr>
    <br>
    <div v-if="inboxStore.requests.length" class="msg">
      <div v-for="(req, index) in inboxStore.requests" class="d-flex"
        style="justify-content: space-between; align-items: center;">
        <span v-html="req.text" />
        <div class="d-flex">
          <span class="btn" @click="acceptRequest(req, index, req.request_type)">Accept</span>
          <span class="btn" @click="rejectRequest(req, index, req.request_type)"
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
import { useInboxStore, Request } from '../../stores/inbox.ts'
import axios from '../../plugins/axios.js'

const inboxStore = useInboxStore()

const props = defineProps<{
  ws: WebSocket,
}>()

function sendRequestToBackend(req: Request, accept: boolean, index: number) {
  console.log("should send")
  axios.post('social/', {
    id: req.user.id,
    request_id: req.request_id,
    msg_type: accept ? 'Accept' : 'Reject',
  }).then(() => {
    inboxStore.requests.splice(index, 1)
  })
}

function acceptRequest(request: Request, index: number, type: String) {
  if (type == "game") {
    console.log(props)
    props.ws.send(JSON.stringify({
      game_id: null,
      action: 'new_game',
      data: {
        game_type: 'Multiplayer',
        opponent: request.opponent,
      },
    }))
  }
  else {
    sendRequestToBackend(request, true, index)
  }
}

function rejectRequest(request: Request, index: number, type: String) {
  if (type == "friend") {
    sendRequestToBackend(request, false, index)
  }
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
