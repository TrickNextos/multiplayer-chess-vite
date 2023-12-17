<template>
    <div style="position: relative;">
        <div class="login">
            <div class="login-head">
                <h1>Register</h1>
            </div>
            <form class="login-main" @submit="onSubmit">
                <label for="username">Username</label><br>
                <input :class="{'red-border': (error_username != '')}" id="username" type="text" v-model="username"><br>
                <label for="password1">Password</label><br>
                <input :class="{'red-border': (error_password != '')}" type="password" v-model="password1"><br>
                <label for="password2">Repeat password</label><br>
                <input :class="{'red-border': (error_password != '')}" type="password" v-model="password2"><br>
                <p v-if="error_password" v-html="error_password" class="error-text" />
                <p v-if="error_username" v-html="error_username" class="error-text" />
                <br>
                <div class="btn-container">
                    <input class="login-btn" type="submit" value="Register">
                    <div @click="moveToLogin()" class="register">
                        Go to login
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
const password1 = ref('')
const password2 = ref('')

const error_password = ref('')
const error_username = ref('')

const auth = useAuthStore()

function onSubmit(e) {
    if (password1.value == password2.value) {
        auth.register(username.value, password1.value).then((register_results) => {
            error_password.value = register_results.error_password_reason
            error_username.value = register_results.error_username_reason
        })
    }
    else {
        error_password.value = "Passwords don't match"
        error_username.value = ''
    }

    e.preventDefault()
}

let moveToLogin = () => {
    window.location.pathname = '/auth/login'
}

</script>
