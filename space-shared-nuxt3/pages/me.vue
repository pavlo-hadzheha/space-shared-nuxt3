<script lang="ts" setup>
definePageMeta({
  pageLabel: 'Me'
})
const auth = useAuth()

</script>

<template>
  <div class="p-20">
    <AppButton
      :type="$componentType.PRIMARY"
      text
      @click="auth.logout"
    >
      Sign Out
    </AppButton>
  </div>
</template>
