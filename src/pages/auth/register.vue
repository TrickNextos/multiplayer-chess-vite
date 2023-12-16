<template>
    <div style="position: relative;">
        <div class="login">
            <div class="login-head">
                <h1>Register</h1>
            </div>
            <div class="login-main">
                <h4>Username:</h4>
                <input :class="{'red-border': (error_username != '')}" type="text" v-model="username"><br>
                <h4>Password:</h4>
                <input :class="{'red-border': (error_password != '')}" type="password" v-model="password1">
                <h4>Repeat password:</h4>
                <input :class="{'red-border': (error_password != '')}" type="password" v-model="password2">
                <br>
                <p v-if="error_password" v-html="error_password" class="error-text" />
                <p v-if="error_username" v-html="error_username" class="error-text" />
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

const error_password = ref('')
const error_username = ref('')

const auth = useAuthStore()

let onSubmit = async () => {
    if (password1.value == password2.value) {
        const register_results = await auth.register(username.value, password1.value)

        error_password.value = register_results.error_password_reason
        error_username.value = register_results.error_username_reason
    }
    else {
        error_password.value = "Passwords don't match"
        error_username.value = ''
    }
}

let moveToLogin = () => {
    window.location.pathname = '/auth/login'
}

</script>
