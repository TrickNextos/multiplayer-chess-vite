<template>
    <div style="position: relative;">
        <div class="login">
            <div class="login-head">
                <h1>Login</h1>
            </div>
            <div class="login-main">
                <h4>Username:</h4>
                <input :class="{'red-border': (error_username != '')}" type="text" v-model="username">
                <h4>Password:</h4>
                <input :class="{'red-border': (error_password != '')}" type="password" v-model="password">
                <br>
                <p v-if="error_password" v-html="error_password" class="error-text" />
                <p v-if="error_username" v-html="error_username" class="error-text" />
                <br>
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

const error_password = ref('')
const error_username = ref('')

const auth = useAuthStore()
console.log("id:", auth.userId)

let onSubmit = async () => {
    const login_response = await auth.login(username.value, password.value)
    console.log(login_response)

    error_password.value = login_response.error_password_reason
    error_username.value = login_response.error_username_reason
}

let onRegister = () => {
    window.location.pathname = '/auth/register'
}
</script>
