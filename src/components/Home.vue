<script setup lang="ts">
import { ref } from "vue";
import Nav from "./Nav.vue";

const registrationOpen = false;
const activeImage = ref<number>(1);
const images = [
  "hero-image.png",
  "hero-image.png",
  "hero-image.png",
  "hero-image.png",
];
function changeActiveImage(left: boolean) {
  if (left)
    activeImage.value =
      activeImage.value == 1 ? images.length - 1 : activeImage.value - 1;
  else
    activeImage.value =
      activeImage.value == images.length - 1 ? 1 : activeImage.value + 1;
}

const metrics = [
  {
    value: "350+",
    text: "PARTICIPANTS AND VOLUNTEERS",
  },
  {
    value: "20+",
    text: "CONNECTED CHURCHES",
  },
  {
    value: "4",
    text: "MAIN SESSIONS",
  },
  {
    value: "35+",
    text: "REPRESENTED NATIONALITIES",
  },
];
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
    <a
      href="#signup"
      class="z-10 font-bold text-white text-lg pt-2 pb-3 px-4 border-2 rounded-lg border-white bg-primary"
    >
      APPLY NOW
    </a>
    <a href="#about" class="absolute z-10 bottom-16"
      ><img src="/arrow.png"
    /></a>
  </div>

  <div
    id="about"
    class="flex flex-col h-dvh w-full justify-center items-center gap-10"
  >
    <div class="flex justify-between w-11/12 max-h-1/3 gap-10 grow">
      <div class="flex flex-col gap-8 w-1/3 grow">
        <h1 class="text-5xl font-bold text-primary w-full text-left">
          WHAT IS BIG WEEKEND?
        </h1>
        <p class="text-md text-justify w-full leading-12">
          Big Weekend is an event for 12-18 year old students. It consists of 2
          nights and three days of worship, fun & games, small group
          discussions, and four teaching sessions designed to support spiritual
          growth for teenagers in the Gulf region. It is an opportunity to meet
          other young people from our region and make new friends. Participants
          represent different cultural and church backgrounds.
        </p>
      </div>
      <div
        class="relative flex flex-col justify-center items-center w-1/3 grow rounded-lg"
      >
        <img
          class="object-cover w-full h-full rounded-lg"
          :src="images[activeImage]"
        />
        <button @click="changeActiveImage(true)">
          <img
            class="rotate-90 cursor-pointer absolute z-10 bottom-5/12 -left-4 mix-blend-difference"
            src="/arrow.png"
          />
        </button>
        <button @click="changeActiveImage(false)">
          <img
            class="-rotate-90 cursor-pointer absolute z-10 bottom-5/12 -right-4 mix-blend-difference"
            src="/arrow.png"
          />
        </button>
      </div>
    </div>
    <div class="flex gap-10 w-11/12 max-h-1/5 grow">
      <div
        v-for="item in metrics"
        class="w-1/5 h-full rounded-lg p-4 grow bg-secondary flex flex-col justify-center items-center gap-4"
      >
        <span class="text-white font-bold text-5xl">{{ item.value }}</span>
        <div class="h-1/3 w-full flex items-center justify-center">
          <span class="text-white text-lg">{{ item.text }}</span>
        </div>
      </div>
    </div>
  </div>

  <div
    id="theme"
    class="flex flex-col h-dvh w-full justify-center items-center gap-10"
  >
    <img src="/theme-logo.png" class="min-w-72 h-auto max-w-2/5" />
    <p class="text-center w-3/5">
      How do you know what is real? Sometimes knowing the difference between
      what is real and what is fake is difficult unless you are familiar with
      the real thing. Looking at a designer bag and a well made copy of it can
      fool you if you don’t know what the real thing really is like. Or looking
      at a photo evidence of something that has happened. How do you know that
      this is not an AI generated photo but the real thing? For a long time
      apostle Paul was living a life that was being influenced by something that
      looked real but was in fact fake. It wasn’t until he met the real person
      of Jesus that he learned that what he thought was real was in fact fake.
      Meeting the real thing changed his life forever. This year at Big Weekend
      we will dive into Philippians chapter 3 to see what it is to be 4REAL.
    </p>
    <div class="flex justify-between w-11/12">
      <img class="h-full w-auto" src="/verse-of-the-theme.png" />
      <video class="aspect-video rounded-lg border"></video>
      <img class="h-full w-auto" src="/4real-logos.png" />
    </div>
  </div>

  <div
    id="speakers"
    class="flex flex-col h-dvh w-full justify-center items-center gap-10"
  >
    <h1 class="text-5xl font-bold text-primary w-full text-center">
      MEET THE SPEAKERS
    </h1>
    <div class="flex flex-wrap justify-center items-center w-11/12">
      <div class="max-w-1/2 h-64 grow flex gap-4 p-4">
        <img
          class="w-1/2 border object-cover object-center rounded-lg bg-black"
        />
        <div class="w-1/2 flex flex-col gap-2 items-start">
          <h2 class="text-2xl font-bold text-secondary">ARNO ALAJOKI</h2>
          <h3 class="text-md font-bold text-tertiary">
            National Director @ UAE YFC/EYU
          </h3>
          <p class="text-md text-justify">
            From the Nordic country of Finland, Arno has been living in the UAE
            since 2022. He holds a BA in Applied Theology and MTh in Systematic
            Theology. He is passionate about equipping and empowering the young
            generation to live out the purpose God has intended for them.
          </p>
        </div>
      </div>
      <div class="max-w-1/2 h-64 grow flex gap-4 p-4">
        <img
          class="w-1/2 border object-cover object-center rounded-lg bg-black"
        />
        <div class="w-1/2 flex flex-col gap-2 items-start">
          <h2 class="text-2xl font-bold text-secondary">FRANK MEYER</h2>
          <h3 class="text-md font-bold text-tertiary">
            Youth Pastor @ Fellowship Dubai
          </h3>
          <p class="text-md text-justify">
            From the Nordic country of Finland, Arno has been living in the UAE
            since 2022. He holds a BA in Applied Theology and MTh in Systematic
            Theology. He is passionate about equipping and empowering the young
            generation to live out the purpose God has intended for them.
          </p>
        </div>
      </div>
      <div class="max-w-1/2 h-64 grow flex gap-4 p-4">
        <img
          class="w-1/2 border object-cover object-center rounded-lg bg-black"
        />
        <div class="w-1/2 flex flex-col gap-2 items-start">
          <h2 class="text-2xl font-bold text-secondary">ELIZABETH SHAHADA</h2>
          <h3 class="text-md font-bold text-tertiary">
            Young Adults Pastor @ Fellowship Dubai
          </h3>
          <p class="text-md text-justify">
            From the Nordic country of Finland, Arno has been living in the UAE
            since 2022. He holds a BA in Applied Theology and MTh in Systematic
            Theology. He is passionate about equipping and empowering the young
            generation to live out the purpose God has intended for them.
          </p>
        </div>
      </div>
      <div class="max-w-1/2 h-64 grow flex gap-4 p-4">
        <img
          class="w-1/2 border object-cover object-center rounded-lg bg-black"
        />
        <div class="w-1/2 flex flex-col gap-2 items-start">
          <h2 class="text-2xl font-bold text-secondary">SECRET PERSON</h2>
          <h3 class="text-md font-bold text-tertiary">?????????? @ ???????</h3>
          <p class="text-md text-justify">All will be revealed in time.</p>
        </div>
      </div>
    </div>
  </div>

  <div
    id="signup"
    class="flex flex-col h-dvh w-full justify-center items-center gap-15"
  >
  <div class="flex flex-col gap-2">
    <h1 class="text-5xl font-bold text-primary w-full text-center">SIGN UP</h1>
    <p>(Registration opens August 1 2025)</p>
  </div>
    <div class="flex flex-wrap gap-15 w-1/2 mb-10">
      <div
        class="bg-secondary min-w-72 grow h-54 text-white rounded-lg flex flex-col justify-center items-center p-4 gap-2 transition-all"
        :class="
          registrationOpen
            ? 'cursor-pointer hover:scale-105'
            : 'opacity-75 cursor-not-allowed'
        "
      >
        <h3 class="text-2xl font-bold">STUDENT SIGN UP</h3>
        <p class="text-md">For individuals around 12-18</p>
      </div>
      <div
        class="bg-secondary min-w-72 grow h-54 text-white rounded-lg flex flex-col justify-center items-center p-4 gap-2 transition-all"
        :class="
          registrationOpen
            ? 'cursor-pointer hover:scale-105'
            : 'opacity-75 cursor-not-allowed'
        "
      >
        <h3 class="text-2xl font-bold">LEADER SIGN UP</h3>
        <p class="text-md">For youth leader/volunteers</p>
      </div>
    </div>
  </div>

  <div
    id="footer"
    class="flex justify-center items-center absolute bottom-0 w-full h-fit"
  >
    <div class="text-white bg-background-layer flex justify-between items-start w-11/12 p-8 rounded-lg mb-8">
      <img src="/bw-25-logo.png" class="aspect-auto" />
      <div class="flex flex-col gap-2">
        <a class="text-md text-left" href="#about">about</a>
        <a class="text-md text-left" href="#theme">theme</a>
        <a class="text-md text-left" href="#speakers">speakers</a>
      </div>
      <div class="flex flex-col gap-2">
        <a class="text-md text-left" href="#about">student sign up</a>
        <a class="text-md text-left" href="#about">leader sign up</a>
      </div>
      <div class="flex gap-10">
        <a href="/"><img class="h-8 w-8" src="/mail.png" /></a>
        <a href="/"><img class="h-8 w-8 ml-1.5" src="/whatsapp.png" /></a>
        <a href="/"><img class="h-8 w-8" src="/instagram.png" /></a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
