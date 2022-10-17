<template>
  <button
    :class="[
      'btn',
      'random',
      {
        'disabled': disabled,
        'plain-text': text,
        'btn-xxl': $mq.xxl,
        'btn-xl': $mq.xl,
        'btn-lg': $mq.lg,
        'btn-md': $mq.md,
        'btn-sm': $mq.sm
      }
    ]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { EBreakpoint, EButtonSize, EComponentType } from '~~/types'
import { colors } from '~~/tailwind'

const props = withDefaults(defineProps<{
  responsive?: boolean
  breakpoints?: Record<EBreakpoint | number, EButtonSize>
  size?: EBreakpoint
  disabled?: boolean
  text?: boolean
  type?: EComponentType
}>(), {
  type: EComponentType.PRIMARY
})

const textColor = computed(() => {
  if (props.text) {
    return colors?.[props.type]
  } else {
    return 'white'
  }
})

const backgroundColor = computed(() => {
  if (props.text) {
    return 'transparent'
  } else {
    return colors?.[props.type] || '#000'
  }
})
</script>

<style scoped lang="scss">
.btn {
  @apply py-[0.5em] px-[1.4em] rounded-5 cursor-pointer text-12;
  @apply border-none transition-all duration-300 ease-in;
  color: v-bind(textColor);
  background-color: v-bind(backgroundColor);

  &.disabled {
    @apply cursor-not-allowed;
    background-color: v-bind('backgroundColor + "88"');
    &.plain-text {
      color: v-bind('textColor + "88"');
    }
  }

  &:hover:not(.disabled) {
    @apply text-white;
    background-color: v-bind('backgroundColor + "88"');
  }

  &.plain-text:hover:not(.disabled) {
    color: v-bind('textColor + "88"')
  }

  & + .btn {
    @apply mr-10;
  }

  &-sm {
    @apply text-12;
  }
  &-md {
    @apply text-14;
  }
  &-lg {
    @apply text-16;
  }
  &-xl {
    @apply text-20;
  }
  &-xxl {
    @apply text-24;
  }
}
</style>
