<template>
    <div style="position: relative;">
        <div class="login">
            <div class="login-head">
                <h1>Login</h1>
            </div> 
            <form class="login-main" @submit="onSubmit">
                <label for="username">Username</label><br>
                <input :class="{'red-border': (error_username != '')}" id="username" type="text" v-model="username"><br>
                <label for="password">Password</label><br>
                <input :class="{'red-border': (error_password != '')}" type="password" v-model="password"><br>
                <p v-if="error_password" v-html="error_password" class="error-text" />
                <p v-if="error_username" v-html="error_username" class="error-text" />
                <br>
                <div class="btn-container">
                    <input class="login-btn" type="submit" value="Log in">
                    <div @click="onRegister()" class="register">
                        Register
                    </div>
                </div>

            </form>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth';
import axios from '@/plugins/axios';

const username = ref('')
const password = ref('')

const error_password = ref('')
const error_username = ref('')

const auth = useAuthStore()
console.log("id:", auth.userId)

function onSubmit(e) {
    auth.login(username.value, password.value).then((login_response) => {        
        error_password.value = login_response.error_password_reason
        error_username.value = login_response.error_username_reason
    })

    e.preventDefault()
}

let onRegister = () => {
    window.location.pathname = '/auth/register'
}
</script>
