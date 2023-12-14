<template>
    <div style="position: relative;">
        <div class="login">
            <div class="login-head">
                <h1>Login</h1>
            </div>
            <div class="login-main">
                <h4>Username:</h4>
                <input type="text" v-model="username">
                <h4>Password:</h4>
                <input type="password" v-model="password">
                <br><br>
                <div class="btn-container">
                    <div @click="onSubmit()" class="login-btn">
                        <h3>Log in</h3>
                    </div>
                    <div @click="onRegister()" class="register">
                        <h3>Register</h3>
                    </div>
                </div>

            </div>
        </div>

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

let onRegister = () => {
    window.location.pathname = '/auth/register'
}

let test = () => {
    axios.get('/auth/test').then((resp) => {
        console.log(resp)
    })
}
</script>
