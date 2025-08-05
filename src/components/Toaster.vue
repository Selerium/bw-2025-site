<script setup lang='ts'>
defineProps({
    visible: {
        type: Boolean,
        required: true,
    },
    error: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
})
</script>
 
<template>
    <div :class="visible ? 'opacity-100 scale-100' : 'scale-90 translate-x-full opacity-0'" class="min-w-72 w-1/4 h-fit transition-all">
        <div :class="error ? 'bg-red-900' : 'bg-green-900'" class="rounded-t-lg pb-2 p-4 flex gap-2 border-2 border-b-0 border-primary">
            <img v-if="!error" class="h-5 w-5" src="/correct.svg" />
            <img v-if="error" class="h-5 w-5" src="/wrong.svg" />
            <h2 class="text-white font-semibold">{{ title }}</h2>
        </div>
        <div class="rounded-b-lg pb-2 p-4 bg-black opacity-80 border-2 border-primary">
            <p class="text-left w-full text-white">{{ description }}</p>
        </div>
    </div>
</template>
 
<style scoped lang='scss'></style>