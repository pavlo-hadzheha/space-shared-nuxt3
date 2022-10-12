<template>
  <el-button
    :size="size"
  >
    <slot />
  </el-button>
</template>

<script setup lang="ts">
import { EComponentSize } from '~~/types'

defineProps<{
  size: EComponentSize
}>()
</script>

<style scoped>

</style>
