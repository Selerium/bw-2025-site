<script setup lang='ts'>
import Nav from './Nav.vue';

</script>
 
<template>
    <Nav class="fixed w-11/12 z-10" />
    <div class="flex flex-col items-center justify-center gap-2 h-dvh">
        <img
            class="w-full h-full object-cover absolute z-0 top-0 left-0"
            src="/hero-image.png"
        />
        <div class="w-11/12 flex flex-col items-center justify-center gap-2 z-10 text-white rounded-lg backdrop-blur-xs p-4">
            <h1 class="pt-4 px-8 text-3xl font-semibold text-left">You're all set!</h1>
            <p class=" px-8 min-w-72 w-2/3">Further details will be sent to your registered email. Keep an eye out for details on email, Instagram, and the respective Whatsapp channels. And your youth leader. Listen to your youth leader. (They want what's best for you. Really. Just do them a favor and listen.)</p>
            <router-link :to="'/'" class="mx-8 mt-4 p-4 pb-2 pt-3 rounded-lg bg-primary text-white font-semibold">BACK TO HOME</router-link>
        </div>
    </div>
</template>
 
<style scoped lang='scss'></style>