<template>
    <div>
        <div>
            <input type="text" v-model="username">
            <input type="password" v-model="password">
            <div @click="onSubmit()">
                submit
            </div>
            <div @click="auth.logout()">
                logout
            </div>
            <div @click="test">
                testing
            </div>
        </div>
        {{ password }}
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth';
import axios from '@/plugins/axios';

const username = ref('')
const password = ref('')

const auth = useAuthStore()
console.log("id:", auth.userId)

let onSubmit = () => {
    auth.login(username.value, password.value)
}

let test = () => {
    axios.get('/auth/test').then((resp) => {
        console.log(resp)
    })
}
</script>
