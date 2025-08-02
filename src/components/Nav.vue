<script setup lang='ts'>
import { ref } from 'vue';

const chosenSection = ref<number>(0);
const showNavBackground = ref<boolean>(false);

function changeSection(value: number) {
    if (value > 4) value = 4;
    chosenSection.value = value;
}

onscroll = () => {
  let area = Math.floor(window.scrollY / (window.innerHeight - 50));
  if (area != chosenSection.value)
    changeSection(area);
  showNavBackground.value = (window.scrollY >= window.innerHeight - 150);
}
</script>
 
<template>
    <div class="px-8 py-1 flex justify-between items-center rounded-lg mt-8 transition-all"
    :class="showNavBackground ? 'bg-background-layer backdrop-blur-xs' : 'mix-blend-difference'">
        <a href="#" class="transition-all" @click="changeSection(0)">
            <img src="/bw-25-logo.png" class="h-10"/>
        </a>
        <div class="w-1/3 flex justify-between items-center rounded-lg p-4">
            <a href="#about" class="transition-all" @click="changeSection(1)" :class="chosenSection == 1 ? 'font-bold text-primary' : 'font-normal text-white'">about</a>
            <a href="#theme" class="transition-all" @click="changeSection(2)" :class="chosenSection == 2 ? 'font-bold text-primary' : 'font-normal text-white'">theme</a>
            <a href="#speakers" class="transition-all" @click="changeSection(3)" :class="chosenSection == 3 ? 'font-bold text-primary' : 'font-normal text-white'">speakers</a>
            <a href="#signup" class="transition-all" @click="changeSection(4)" :class="chosenSection == 4 ? 'font-bold text-primary' : 'font-normal text-white'">sign up</a>
        </div>
        <div class="flex gap-10 items-center">
            <a href="mailto:adi@eyu.ae"><img class="h-6 w-6" src="/mail.png"/></a>
            <a href="/"><img class="h-6 w-6 ml-1.5" src="/whatsapp.png"/></a>
            <a href="https://instagram.com/eyunlimited"><img class="h-6 w-6" src="/instagram.png"/></a>
        </div>
    </div>
</template>
 
<style scoped lang='scss'></style>