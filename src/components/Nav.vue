<template>
    <nav>
        <router-link :class="{'underline' : route.path === '/' }"  class="p-1 hover:underline rounded-xl" to="/">Home</router-link>
        <h2 class="text-xl mt-4" >Endpoints</h2>
        <ul class="flex flex-col gap-2 pt-4"  >
            <li  v-for="link in links"  :class="{'underline' : route.path === link.path }"  class="p-1 hover:underline rounded-xl":key="link.name" >
                <router-link :to="link.path">{{ link.name }}</router-link>
            </li>
        </ul> 
    </nav>
</template>
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const links = [
    { name: 'User', path: '/user' },
    { name: 'Login', path: '/login' },
    { name: 'Logout', path: '/logout' },
    { name: 'Register', path: '/register' },
    { name: 'Verify Email', path: '/verify-email' },
    { name: 'Resend Email Verification', path: '/resend-email-verification' },
    { name: 'Forgot Password', path: '/forgot-password' },
    { name: 'Reset Password', path: '/reset-password' },
]

</script>
