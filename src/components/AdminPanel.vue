<script setup lang='ts'>
import { ref } from 'vue';
import TextInput from './form/TextInput.vue';
import { supabase } from '../lib/supabaseClient';

const username = 'arnoiscool';
const password = 'coolisarno';

const loggedIn = ref<boolean>(false);
const inputUsername = ref<string>();
const inputPassword = ref<string>();
const rows = ref({});

async function checkLogIn() {
    if (inputUsername.value == username && inputPassword.value == password) {
        loggedIn.value = true;
        
        let { data, error } = await supabase
        .from('registrations-25')
        .select('*');

        console.log(data);
        console.log(error);

        if (data)
            rows.value = data;
    }
}
</script>
 
<template>
    <div v-if="!loggedIn" class="flex flex-col gap-4 justify-center items-center h-dvh w-dvw">
        <div class="w-1/2 min-w-72 flex flex-col gap-4 rounded-lg border py-4">
            <h1 class="text-3xl font-semibold">Big Weekend Admin Panel</h1>
            <div class="flex flex-col w-full justify-center items-center gap-4">
                <TextInput v-model="inputUsername" :title="'Username'" :placeholder="'-----'" />
                <TextInput v-model="inputPassword" :title="'Password'" :placeholder="'-----'" />
                <button @click="checkLogIn" class="px-4 pb-2 pt-3 rounded-lg bg-secondary text-white">LOG IN</button>
            </div>
        </div>
    </div>

    <div class="p-4 overflow-y-scroll flex flex-col justify-center items-start gap-2 w-full" v-if="loggedIn">
        <h1 class="text-3xl font-semibold text-left:">Sign Ups</h1>
        <div class="flex flex-col items-start justify-start gap-2 p-4 overflow-x-scroll w-full">
            <div class="flex gap-2 border-b-2 font-semibold">
                <p class="w-50">ID</p>
                <p class="w-50">datetime</p>
                <p class="w-50">full_name</p>
                <p class="w-50">gender</p>
                <p class="w-50">date_of_birth</p>
                <p class="w-50">age</p>
                <p class="w-50">role</p>
                <p class="w-50">nationality</p>
                <p class="w-50">id_number</p>
                <p class="w-50">email</p>
                <p class="w-50">phone_number</p>
                <p class="w-50">emergency_name</p>
                <p class="w-50">emergency_number</p>
                <p class="w-50">church_name</p>
                <p class="w-50">church_code</p>
                <p class="w-50">youth_leader</p>
                <p class="w-50">youth_number</p>
                <p class="w-50">shirt_size</p>
                <p class="w-50">graduating</p>
                <p class="w-50">launch_conf</p>
                <p class="w-50">swimming</p>
                <p class="w-50">allergies</p>
                <p class="w-50">allergies_info</p>
                <p class="w-50">medication</p>
                <p class="w-50">medication_info</p>
                <p class="w-50">eyu_cap</p>
                <p class="w-50">bw_25_shirt</p>
                <p class="w-50">bw_25_shirt_size</p>
                <p class="w-50">online_payment</p>
                <p class="w-50">acknowledgement</p>
                <p class="w-50">paid</p>
            </div>
            <div v-for="row in rows" class="flex gap-2 border-b-1">
                <span v-for="field in row" class="w-50 text-wrap">{{ field == true ? 'yes' : field == false ? 'no' : field == undefined ? '-' : field }}</span>
            </div>
        </div>
    </div>
</template>
 
<style scoped lang='scss'></style>