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
    options: {
        type: Array,
        required: true,
    },
    error: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false
    },
    extraCss: {
        type: String,
        required: false,
        default: '',
    }
});

const modelValue = defineModel();
</script>

<template>
    <div class="w-full xl:w-1/3 grow flex flex-col items-start gap-1">
        <label :class="props.disabled ? 'opacity-50' : ''" class="rounded-lg w-full text-left">{{ props.title }} <span v-if="props.error && !props.disabled" class="font-semibold text-red-900">Required</span></label>
        <select :disabled="props.disabled" v-model="modelValue" required :class="extraCss" class="font-semibold rounded-lg w-full text-left border border-black h-12 pt-3 pb-2 px-2 disabled:cursor-not-allowed disabled:opacity-50">
            <option selected disabled hidden value="">{{ props.placeholder }}</option>
            <option v-for="value in props.options" class="capitalize" :value="value == true ? true : (value == false ? false : String(value).toLowerCase())">{{value == true ? 'Yes' : (value == false ? 'No' : value)}}</option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
select:invalid {
    color: gray;
}
option {
    color: black;
}
</style>