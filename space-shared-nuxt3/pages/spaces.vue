<script lang="ts" setup>
import { FontAwesomeIconsList } from '@/plugins/font-awesome.plugin'

definePageMeta({
  pageLabel: 'Spaces',
  navOrder: 2,
  icon: FontAwesomeIconsList.fasBuilding,
  middleLink: true
})
</script>

<template>
  <ElMain class="p-20">
    <AppButton
      :type="$componentType.PRIMARY"
      text
    >
      PRIMARY
    </AppButton>

    <AppButton
      :type="$componentType.SUCCESS"
      text
    >
      SUCCESS
    </AppButton>

    <AppButton
      :type="$componentType.PRIMARY"
    >
      PRIMARY
    </AppButton>

    <AppButton
      :type="$componentType.SUCCESS"
    >
      SUCCESS
    </AppButton>

    <AppButton
      :type="$componentType.PRIMARY"
      disabled
    >
      PRIMARY
    </AppButton>

    <AppButton
      :type="$componentType.PRIMARY"
      text
      disabled
    >
      SUCCESS
    </AppButton>
  </ElMain>
</template>
