<template>
    <div style="position: relative;">
        <div class="login">
            <div class="login-head">
                <h1>Register</h1>
            </div>
            <div class="login-main">
                <h4>Username:</h4>
                <input type="text" v-model="username"><br>
                <h4>Password:</h4>
                <input type="password" v-model="password1">
                <h4>Repeat password:</h4>
                <input type="password" v-model="password2">
                <br>
                <p v-if="show_wrong_password">
                    Passwords don't match
                </p>
                <br>
                <div class="btn-container">
                    <div @click="onSubmit()" class="login-btn">
                        <h3>Register</h3>
                    </div>
                    <div @click="moveToLogin()" class="register">
                        <h3>Go to login</h3>
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
const password1 = ref('')
const password2 = ref('')

const show_wrong_password = ref('')

const auth = useAuthStore()

let onSubmit = () => {
    if (password1.value == password2.value) {
        show_wrong_password.value = false
        auth.register(username.value, password1.value)
    }
    else {
        show_wrong_password.value = true
    }
}

let moveToLogin = () => {
    window.location.pathname = '/auth/login'
}

</script>
