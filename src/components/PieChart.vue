<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  values: {
    type: String,
    required: true,
  },
  labels: {
    type: Array<String>,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col gap-2 justify-start items-center">
    <p class="text-xl font-semibold">{{ props.name }}</p>
    <div class="pie-chart w-40 h-40"></div>
    <div class="w-full flex gap-2">
      <div class="h-4 w-4 bg-secondary"></div>
      <p>{{ props.labels[0] }}</p>
    </div>
    <div class="w-full flex gap-2">
      <div class="h-4 w-4 bg-primary"></div>
      <p>{{ props.labels[1] }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pie-chart {
  background: v-bind(values);
  border-radius: 50%;
}
</style>
