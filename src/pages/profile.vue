<template>
<Header :ws="ws" class="header"/>
<main class="d-flex">
    <div>
      <h1 v-if="data" style="text-align: center;">{{ data.info.username }}</h1>
      <br>
      <div>
        Friends:
        <ul>
          <li v-if="data" v-for="friend in data.friends">
            <a @click="() => changePlayer(friend.id)">{{friend.username}}</a>
          </li>
      </ul>
      </div>
    </div>
    <div>
      <h2>Games:</h2>
      <br>
      <div class="games">
          <div v-if="data" v-for="game in data.games">
            <div class="game_inner">
              <div v-if="game.singleplayer == '1'">
                Singleplayer
              </div>
              <div v-else>
                <b><a @click="() => changePlayer(game.opponent.id)">{{game.opponent.username}}</a></b> ({{ game.playing }})
                <i>
                  <span v-if="game.win == 'draw'">Draw</span>
                  <span v-else-if="game.win == game.playing">Win</span>
                  <span v-else>Lost</span>
                </i>
              </div>
            </div>
            <a @click="download_file(game.id)">Download fen file</a>
          </div>
      </div>
    </div>
</main>
</template>

<script setup>
import axios from '@/plugins/axios'
import Header from '@/components/Header.vue'
import {
  useAuthStore
} from '@/stores/auth'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()

function changePlayer(hash) {
  window.location.pathname = '/profile/' + hash
  console.log(hash)
  // window.location.reload()
}

const auth = useAuthStore()
const username = ref('')

const ws = new WebSocket('ws://localhost:5678/game/ws/' + auth.userId)
const data = ref('')
const current_player = window.location.hash.replace('#','') != '' ? window.location.hash.replace('#','') : auth.userId 

onMounted(async () => {
  username.value = await useAuthStore().get_username()
  console.log(route)

  // let url = '/social/' + window.location.hash.replace('#','')
  data.value = (await axios({url: route.path.replace('profile', 'social/profile'), method: 'get'})).data
  console.log(data)
})


function download_file(id) {
  axios({
      url: '/social/download_fen/' + id,
      method: 'GET',
      responseType: 'blob',
    })
    .then(response => {

      const type = response.headers['content-type']
      const blob = new Blob([response.data], {
        type: type,
        encoding: 'UTF-8'
      })

      const href = window.URL.createObjectURL(blob);
      console.log(response)

      const anchorElement = document.createElement('a');

      anchorElement.href = href;

      // 1) Get the value of content-disposition header
      const contentDisposition =
        response.headers['content-disposition'];

      console.log('contentDisposition: ', contentDisposition);

      // 2) set the fileName variable to the default value
      let fileName = "ChezzGame.pgn";

      // 3) if the header is set, extract the filename
      if (contentDisposition) {
        const fileNameMatch =
          contentDisposition.match(/filename="(.+)"/);
        console.log('fileNameMatch', fileNameMatch);
        if (fileNameMatch.length === 2) {
          fileName = fileNameMatch[1];
        }
      }

      anchorElement.download = "test.txt";

      document.body.appendChild(anchorElement);
      anchorElement.click();

      document.body.removeChild(anchorElement);
      window.URL.revokeObjectURL(href);
    })
    .catch(error => {
      console.log('error: ', error);
    });
}
</script>

<style>
.header {
  position: sticky;
  top: 0;
}

main {
    width: 100%;
    padding: 2em;
}

main > div:nth-child(1) {
    flex: 1;
}

main >div:nth-child(2) {
    flex: 2;
}

.games {
  display: flex;
  flex-direction: column;
  gap: 0.2em;
}

.games > div {
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
  border-radius: 0.5em;
  padding: 0.6em;
  display: flex;
} 

.game_inner {
  display: flex;
  justify-items: ;
  flex: 1;
}
</style>