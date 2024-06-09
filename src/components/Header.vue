<template>
<div class="header d-flex">
    <div class="header-left d-flex">
        <h3>Hello {{ username }}</h3>
        <div class="d-flex" style="gap: 1em">
            <div @click="() => redirect('/')">Play</div>
            <div @click="() => redirect('profile')">Profile</div>
            <div @click="() => redirect('about')">About</div>
            <div>|</div>
            <div @click="() => openModal(FriendsModal)">Friends</div>
            <div @click="() => openModal(InboxModal, { ws })">Inbox</div>
        </div>
    </div>
    <div class="btn" @click="useAuthStore().logout()">Logout</div>
</div>
</template>

<script setup lang="ts">
import FriendsModal from '@/components/modals/FriendsModal.vue'
import InboxModal from '@/components/modals/InboxModal.vue'
import {
    openModal
} from 'jenesius-vue-modal'
import {
    onMounted,
    ref
} from 'vue'
import {
    useAuthStore
} from "@/stores/auth"

function redirect(path) {
    if (window.location.href != path) {
        window.location.pathname = path
    }
}

const {ws} = defineProps({
    ws: WebSocket,
})


const username = ref('')
onMounted(async () => {
    username.value = await useAuthStore().get_username()
})
</script>
