<template>

    <form @submit.prevent="handleSubmit">
        <input type="text" required placeholder="Display Name" v-model="displayName">
        <input type="email" required placeholder="email" v-model="email">
        <input type="password" required placeholder="password" v-model="password">
        <div class="error"> {{ error }}</div>
        <button type="submit">Sign Up</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import useSignup from '@/composables/useSignup';
const emits = defineEmits('signup')


const { error, signup } = useSignup();

const displayName = ref('');
const email = ref('');
const password = ref('')

const handleSubmit = async () => {
    await signup(email.value, password.value, displayName.value)

    if (!error.value) {
        emits('signup')
    }
}

</script>

<style>

</style>