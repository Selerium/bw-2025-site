<script setup lang="ts">
import { onMounted } from 'vue';
import Home from './components/Home.vue';
import { supabase } from './lib/supabaseClient';

async function testSupabase() {
  const {data} = await supabase.from('registrations-25').select()
  console.log(data);
}

onMounted(() => {
  testSupabase();
})
</script>

<template>
  <div class="w-full flex flex-col justify-start items-center relative">
    <router-view />
  </div>
</template>

<style scoped>
</style>
