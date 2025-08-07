<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        required: true,
        default: 'Error (Ignore)'
    },
    useImage: {
        type: Boolean,
        default: false
    },
    imageSrc: {
        type: String,
    },
    error: {
        type: Boolean,
        default: false,
    }
});

const modelValue = defineModel();
</script>

<template>
    <div class="w-full xl:w-1/3 grow flex flex-col justify-start items-start gap-2">
        <div class="w-full flex gap-2">
            <input v-model="modelValue" class="font-semibold rounded-lg text-left border" type="checkbox"></input>
            <label class="rounded-lg text-left">{{ props.title }}</label>
        </div>
        <img v-if="props.useImage" class="rounded-lg border aspect-video w-full" :src="imageSrc"/>
    </div>
</template>
<style lang="scss" scoped></style>