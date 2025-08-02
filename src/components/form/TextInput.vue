<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        required: true,
        default: 'Error (Ignore)'
    },
    placeholder: {
        type: String,
        required: true,
        default: '...'
    },
    last: {
        type: Boolean,
        required: false,
        default: false
    },
    error: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

const modelValue = defineModel();
</script>

<template>
    <div class="w-full xl:w-1/3 grow flex flex-col items-start gap-1">
        <label :class="props.disabled ? 'opacity-50' : ''" class="rounded-lg w-full text-left">{{ props.title }} <span v-if="props.error && !props.disabled" class="font-semibold text-red-900">Required</span></label>
        <input :disabled="props.disabled" v-model="modelValue" required :placeholder="props.placeholder" class="font-semibold rounded-lg w-full full text-left border p-2 pt-3 h-12 disabled:cursor-not-allowed disabled:opacity-50" type="text"></input>
    </div>
</template>

<style lang="scss" scoped>
</style>