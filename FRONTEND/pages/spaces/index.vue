<script lang="ts" setup>
import { FontAwesomeIconsList } from '@/plugins/font-awesome.plugin'

definePageMeta({
  pageLabel: 'Spaces',
  navOrder: 2,
  icon: FontAwesomeIconsList.fasBuilding,
  middleLink: true
})
const general = useGeneral()
const spaces = useSpaces()

async function init () {
  try {
    general.loading = true
    await Promise.all([
      spaces.getSpaces(),
      general.getSpaceCategories(),
      general.getSpaceFeatures()
    ])
  } finally {
    general.loading = false
  }
}

await init()
</script>

<template>
  <ElContainer class="container md:px-0 px-5 pt-10">
    <SpacesFilter #default="{filtered}" :spaces="spaces.spaces">
      <div
        :class="[
          'grid gap-5',
          'grid-cols-1',
          'md:grid-cols-2',
          'lg:grid-cols-3',
          'xxl:grid-cols-4',
        ]"
      >
        <SpaceCard
          v-for="_item in filtered"
          :key="`space-${_item.id}`"
          :space="_item"
        />
      </div>
    </SpacesFilter>
  </ElContainer>
</template>
