<script setup lang="ts">
import { ref } from "vue";
import Nav from "./Nav.vue";

const activeImage = ref<number>(1);
const images = [
    'hero-image.png',
    'hero-image.png',
    'hero-image.png',
    'hero-image.png',
]
function changeActiveImage(left: boolean) {
    if (left)
        activeImage.value = (activeImage.value == 1 ? images.length - 1 : activeImage.value - 1);
    else
        activeImage.value = (activeImage.value == images.length - 1 ? 1 : activeImage.value + 1);
}

const metrics = [
    {
        value: '350+',
        text: 'PARTICIPANTS AND VOLUNTEERS',
    },
    {
        value: '20+',
        text: 'CONNECTED CHURCHES',
    },
    {
        value: '4',
        text: 'MAIN SESSIONS',
    },
    {
        value: '35+',
        text: 'REPRESENTED NATIONALITIES',
    },
]
</script>

<template>
  <Nav class="fixed z-10 w-11/12" />
  <div
    id="home"
    class="flex flex-col h-dvh w-full justify-center items-center relative gap-10"
  >
    <img
      class="w-full h-full object-cover absolute z-0"
      src="/hero-image.png"
    />
    <div class="flex flex-col gap-4">
      <h1 class="z-10 text-white font-bold text-5xl">BIG WEEKEND 2025</h1>
      <p class="z-10 text-white text-lg">October 17-19, 2025</p>
    </div>
    <button
      class="z-10 font-bold text-white text-lg pt-2 pb-3 px-4 border-2 rounded-lg border-white bg-primary"
    >
      APPLY NOW
    </button>
    <a href="#" class="absolute z-10 bottom-16"><img src="/arrow.png" /></a>
  </div>
  <div id="about" class="flex flex-col h-dvh w-full justify-center items-center gap-10">
    <div class="flex justify-between w-11/12 max-h-2/5 gap-10 grow">
      <div class="flex flex-col justify-between w-1/3 grow">
        <h1 class="text-5xl font-bold text-primary w-full text-left">WHAT IS BIG WEEKEND?</h1>
        <p class="text-lg text-justify w-full">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dolor
            lectus, sollicitudin at fringilla eu, cursus vel urna. Maecenas
            tristique, justo a vehicula pulvinar, est lorem porta magna, ac
            gravida ipsum mauris sit amet lectus. Vivamus rutrum sapien auctor
            venenatis lobortis.
        </p>
        <p class="text-lg text-justify w-full">  
          Donec eget ante sit amet sem semper lacinia sed et
          odio. In tellus sapien, suscipit ut felis a, aliquet auctor neque.
          Mauris vehicula odio in accumsan consequat. Vivamus rutrum sapien
          auctor venenatis lobortis. Donec eget ante sit amet sem semper lacinia
          sed et odio. In tellus sapien, suscipit ut felis a, aliquet auctor
          neque. Mauris vehicula odio in accumsan consequat.
        </p>
      </div>
      <div class="relative flex flex-col justify-center items-center w-1/3 grow rounded-lg">
        <img class="object-cover w-full h-full rounded-lg" :src="images[activeImage]"/>
        <button @click="changeActiveImage(true)"><img class="rotate-90 absolute z-10 bottom-5/12 -left-4 mix-blend-difference" src="/arrow.png" /></button>
        <button @click="changeActiveImage(false)"><img class="-rotate-90 absolute z-10 bottom-5/12 -right-4 mix-blend-difference" src="/arrow.png" /></button>
      </div>
    </div>
    <div class="flex gap-10 w-11/12">
        <div v-for="item in metrics" class="w-1/5 rounded-lg p-4 grow bg-secondary flex flex-col justify-center items-center gap-4">
            <span class="text-white font-bold text-5xl">{{item.value}}</span>
            <div class="h-1/2 w-full flex items-center justify-center">
                <span class="text-white text-lg">{{item.text}}</span>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
