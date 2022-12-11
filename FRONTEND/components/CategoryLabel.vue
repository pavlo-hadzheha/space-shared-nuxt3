<template>
  <div class="label label-primary">{{ label }}</div>
</template>

<script lang="ts" setup>
defineProps<{ label: string }>()
</script>

<style lang="scss" scoped>
.label {
  @apply bg-primary rounded-full p-2 w-max;
  @apply text-white text-xs mb-[10px];
}
</style>
