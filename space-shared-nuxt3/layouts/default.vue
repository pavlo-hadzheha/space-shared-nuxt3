<template>
  <div v-loading="general.loading">
    <ElContainer>
      <ElHeader>
        <slot name="pageHeader">
          <Navbar />
        </slot>
      </ElHeader>
      <ElContainer class="md:mb-0 pb-24" :style="{minHeight: 'calc(100vh - 90px - 96px)'}">
        <!-- LEFT CONTENT -->
        <ElAside v-if="$slots.pageLeft">
          <slot name="pageLeft" />
        </ElAside>

        <!-- MAIN -->
        <ElMain class="main">
          <slot />
        </ElMain>

        <!-- RIGHT CONTENT -->
        <ElAside v-if="$slots.pageRight">
          <slot name="pageRight" />
        </ElAside>
      </ElContainer>
      <ElFooter class="md:block hidden">
        <div class="h-24 bg-black" />
      </ElFooter>
    </ElContainer>
  </div>
</template>

<script setup lang="ts">
const general = useGeneral()
// import { EBreakpoint } from '~~/types'

// const queries = {
//   xxl: `(min-width: ${EBreakpoint.XXL}px)`,
//   xl: `(min-width: ${EBreakpoint.XXL}px)`,
//   lg: `(min-width: ${EBreakpoint.LG}px)`,
//   md: `(min-width: ${EBreakpoint.MD}px)`,
//   sm: `(min-width: ${EBreakpoint.SM}px)`
// }
</script>
