<template>
  <div class="top-div">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  link: [{
    rel: 'stylesheet',
    href: 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css',
    integrity: 'sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p',
    crossorigin: 'anonymous'
  }],
  bodyAttrs: {
    class: 'overflow-hidden'
  }
})
</script>

<style lang="scss">
.top-div {
  font-family: Nunito-Regular;
}
</style>
