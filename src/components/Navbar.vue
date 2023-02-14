<template>
    <nav v-if="user">
        <div>
            <p> Hey there {{ user.displayName }} </p>
            <p class="email"> Currently logged in as {{ user.email }} </p>
        </div>
        <button @click="handleClick">Logout</button>
    </nav>
</template>

<script setup>

import useLogout from '@/composables/useLogout';
import { useRouter } from 'vue-router';
import getUser from '@/composables/getUser'

const router = useRouter()

// Get User Data
const { user } = getUser()

if (!user) {
    router.push({ name: 'Welcome' })
}


const { error, logout } = useLogout()

const handleClick = async () => {
    await logout()
    if (!error.value) {
        router.push({ name: 'Welcome' })
    }

}

</script>

<style>
nav {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

nav p {
    margin: 2px auto;
    font-size: 16px;
    color: #444;
}

nav p.email {
    font-size: 14px;
    color: #999;
}
</style>