<script setup lang='ts'>
import { ref } from 'vue';

const chosenSection = ref<number>(0);

function changeSection(value: number) {
    chosenSection.value = value;
}
</script>
 
<template>
    <div class="py-4 flex justify-between items-center">
        <a href="#" class="transition-all" @click="changeSection(0)">
            <img class="mix-blend-difference" src="/bw-25-logo.png" />
        </a>
        <div class="w-1/3 flex justify-between items-center">
            <a href="#" class="transition-all mix-blend-difference" @click="changeSection(1)" :class="chosenSection == 1 ? 'font-bold text-primary' : 'font-normal text-white'">about</a>
            <a href="#" class="transition-all mix-blend-difference" @click="changeSection(2)" :class="chosenSection == 2 ? 'font-bold text-primary' : 'font-normal text-white'">theme</a>
            <a href="#" class="transition-all mix-blend-difference" @click="changeSection(3)" :class="chosenSection == 3 ? 'font-bold text-primary' : 'font-normal text-white'">speakers</a>
            <a href="#" class="transition-all mix-blend-difference" @click="changeSection(4)" :class="chosenSection == 4 ? 'font-bold text-primary' : 'font-normal text-white'">sign up</a>
        </div>
        <div class="flex gap-10 items-center mix-blend-difference">
            <a href="/"><img class="h-8 w-8" src="/mail.png"/></a>
            <a href="/"><img class="h-8 w-8 ml-1.5" src="/whatsapp.png"/></a>
            <a href="/"><img class="h-8 w-8" src="/instagram.png"/></a>
        </div>
    </div>
</template>
 
<style scoped lang='scss'></style>