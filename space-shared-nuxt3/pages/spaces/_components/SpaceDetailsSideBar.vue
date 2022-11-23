<script lang="ts" setup>
import { ISpace, TNullableField } from '@/types'
import { capitalize } from 'lodash'

defineProps<{
  space?: TNullableField<ISpace>
}>()

</script>

<template>
  <div class="p-4 rounded-md bg-gray-100">
    <div class="flex justify-between items-center">
      <span class="text-xl font-bold text-gray-500">Schedule</span>
      <img src="@/assets/svg/planet-space-svgrepo-com.svg" width="46">
    </div>
    <el-divider :style="{marginBlock: '10px'}" />
    <h3 class="font-bold text-md">Opened at</h3>
    <p
      v-for="(_config, _day) in space?.opened_at"
      :key="`opened-at-day-${_day}`"
      class="text-black flex justify-between"
      :class="{'opacity-[0.6] line-through': !_config.available}"
    >
      <span>
        {{ capitalize(_day) }}:
      </span>
      <span>
        {{ $filters.date(_config.from, 'shortTime') }}
        - {{ $filters.date(_config.to, 'shortTime') }}
      </span>
    </p>
    <div class="flex gap-2 mt-5">
      <AppButton :size="$buttonSize.SM">
        <i class="fal fa-bookmark" />
        Book now!
      </AppButton>

      <AppButton :size="$buttonSize.SM">
        <i class="fal fa-envelope-open" />
        SendMessage
      </AppButton>
    </div>
  </div>
</template>
