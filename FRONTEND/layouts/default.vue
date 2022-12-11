<template>
  <div
    v-loading="general.loading"
    class="h-screen overflow-x-hidden"
    :class="{'overflow-hidden': $route.meta.screenHeight, 'overflow-auto': !$route.meta.screenHeight,}"
  >
    <ElContainer>
      <ElHeader>
        <slot name="pageHeader">
          <Navbar />
        </slot>
      </ElHeader>
      <ElContainer
        class="md:mb-0"
        :class="{
          'screen-height': $route.meta.screenHeight,
          'pb-24': !$route.meta.screenHeight
        }"
      >
        <!-- LEFT CONTENT -->
        <ElAside v-if="$slots.pageLeft">
          <slot name="pageLeft" />
        </ElAside>

        <!-- MAIN -->
        <ElMain class="main h-full">
          <slot containerMinHeight="calc(100vh - 90px - 96px)" />
        </ElMain>

        <!-- RIGHT CONTENT -->
        <ElAside v-if="$slots.pageRight">
          <slot name="pageRight" />
        </ElAside>
      </ElContainer>
      <ElFooter v-if="showFooter" class="md:block hidden">
        <div class="h-36 bg-black" />
      </ElFooter>
    </ElContainer>
  </div>
</template>

<script setup lang="ts">
const general = useGeneral()
const route = useRoute()
const showFooter = computed(() => typeof route.meta.footer === 'boolean' ? route.meta.footer : true)
// import { EBreakpoint } from '~~/types'

// const queries = {
//   xxl: `(min-width: ${EBreakpoint.XXL}px)`,
//   xl: `(min-width: ${EBreakpoint.XXL}px)`,
//   lg: `(min-width: ${EBreakpoint.LG}px)`,
//   md: `(min-width: ${EBreakpoint.MD}px)`,
//   sm: `(min-width: ${EBreakpoint.SM}px)`
// }

</script>

<style lang="scss" scoped>
.screen-height {
  @apply md:pb-0;
  height: calc(100vh - 126px);

  @screen md {
    height: calc(100vh - 90px)
  }
}
</style>
