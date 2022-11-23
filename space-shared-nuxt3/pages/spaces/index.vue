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

const useFilterDrawer = (() => {
  const opened = ref(false)
  function open () {
    opened.value = true
  }
  return {
    state: reactive({ opened }),
    open
  }
})()

async function init () {
  try {
    general.loading = true
    await spaces.getSpaces()
    await general.getSpaceCategories()
  } finally {
    general.loading = false
  }
}

await init()

// const shown = ref(true)
// async function rerender () {
//   shown.value = false
//   await promiseTimeout(2000)
//   shown.value = true
// }

</script>

<template>
  <ElContainer class="container md:px-0 px-5 pt-10">
    <div class="my-5 flex justify-end">
      <AppButton
        round
        :size="$buttonSize.XL"
        @click="useFilterDrawer.open()"
      >
        <i class="fas fa-filter" />
      </AppButton>
    </div>

    <div
      :class="[
        'grid gap-5',
        'grid-cols-1',
        'md:grid-cols-2',
        'lg:grid-cols-3',
        'xxl:grid-cols-4'
      ]"
    >
      <SpaceCard
        v-for="_item in spaces.spaces"
        :key="`space-${_item.id}`"
        :space="_item"
      />
    </div>

    <div>
      <el-drawer
        v-model="useFilterDrawer.state.opened"
        :lock-scroll="false"
      >
        <SpacesFilter />
      </el-drawer>
    </div>
  </ElContainer>
</template>
