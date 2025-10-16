<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  loggedIn: {
    type: Boolean,
    required: true,
  },
  selectedOption: {
    type: Number,
    required: true,
  },
  adminPrivileges: {
    type: Boolean,
    required: true,
    default: false,
  },
  showSidebar: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["changeSection", "closeSidebar"]);
</script>

<template>
  <div
    class="lg:w-36 fixed flex flex-col justify-center items-center left-0 h-full p-2 w-full not-lg:bg-white z-50 transition-all"
    :class="showSidebar ? '' : 'not-lg:-translate-x-full'"
  >
    <div
      class="w-36 flex flex-col justify-between p-2 white h-80 lg:h-full rounded"
    >
      <img :src="'/bw-25-logo.png'" class="invert w-full h-auto" />
      <div class="flex flex-col gap-4">
        <button
          @click="emit('changeSection', 0)"
          class="rounded cursor-pointer p-2"
          :class="
            selectedOption == 0
              ? 'text-white bg-secondary font-semibold'
              : 'hover:bg-primary hover:text-white text-black'
          "
        >
          Namelist
        </button>
        <button
          v-if="adminPrivileges"
          @click="emit('changeSection', 1)"
          class="rounded cursor-pointer p-2"
          :class="
            selectedOption == 1
              ? 'text-white bg-secondary font-semibold'
              : 'hover:bg-primary hover:text-white text-black'
          "
        >
          Dashboard
        </button>
      </div>
      <div class="flex flex-col gap-4">
        <button
          @click="router.go(0)"
          class="rounded cursor-pointer p-2 hover:bg-primary hover:text-white text-black"
        >
          Log Out
        </button>
        <button
          @click="emit('closeSidebar')"
          class="lg:hidden block rounded cursor-pointer p-2 hover:bg-primary hover:text-white text-black"
        >
          Close Sidebar
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
