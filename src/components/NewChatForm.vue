<template>
    <form>

        <textarea @keypress.enter.prevent="handleSubmit" placeholder="Type a message and hit enter to send ..."
            v-model="message"></textarea>
        <div class="error"> {{ error }}</div>
    </form>
</template>


<script setup>
import { ref } from 'vue';
import { timestamp } from '@/firebase/config';
import getUser from '@/composables/getUser';
import useCollection from '@/composables/useCollection'

const { user } = getUser()


const { error, addDoc } = useCollection('messages')
const message = ref('')

const handleSubmit = async () => {
    const chat = {
        name: user.value.displayName,
        message: message.value,
        createdAt: timestamp()
    }

    // console.log(chat)
    await addDoc(chat)

    if (!error.value) {
        message.value = ''
    }
}

</script>

<style scoped>
form {
    margin: 10px;
}

textarea {
    width: 100%;
    max-width: 100%;
    margin-bottom: 6px;
    padding: 10px;
    box-sizing: border-box;
    border: 0;
    border-radius: 20px;
    font-family: inherit;
    outline: none;
}

.error {
    text-align: center;
    color: #ff2a58;
    font-size: 12px;
    padding: 10px 0;
}
</style>