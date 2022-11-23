<template>
  <button
    ref="button"
    :class="[
      'btn',
      {
        disabled: disabled,
        'plain-text': text,
        'btn--responsive': responsive,
        ['btn--' + size]: !!size,
        'btn--round': round,
      },
    ]"
    @mousedown="onMousedown"
    @mouseup="onMouseup"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { EButtonSize, TNullableField, EComponentType } from '@/types'

const colors = {
  transparent: 'transparent',
  success: '#70E0DE',
  primary: '#F30067',
  danger: '#FD3E3E',
  disabled: '#C0C4CC',
  info: '#696969'
}

const props = withDefaults(
  defineProps<{
    responsive?: boolean
    size?: EButtonSize
    disabled?: boolean
    text?: boolean
    type?: EComponentType
    round?: boolean
  }>(),
  {
    type: EComponentType.PRIMARY,
    size: EButtonSize.MD
  }
)

const button = ref<TNullableField<HTMLButtonElement>>()

const textColor = computed(() => {
  if (props.text) {
    return colors[props.type as keyof typeof colors]
  } else {
    return 'white'
  }
})

const backgroundColor = computed(() => {
  if (props.text) {
    return 'transparent'
  } else {
    return colors[props.type as keyof typeof colors] || '#000'
  }
})

function onMousedown (_event: MouseEvent) {
  const target = _event.target as HTMLButtonElement
  if (target) {
    target.style.opacity = '0.6'
  }
}

function onMouseup (_event: MouseEvent) {
  const target = _event.target as HTMLButtonElement
  if (target) {
    target.style.opacity = '1'
  }
}
</script>

<style scoped lang="scss">
.btn {
  @apply py-[0.5em] px-[1.4em] rounded-md cursor-pointer text-xs;
  @apply border-none transition-all duration-300 ease-in;
  color: v-bind(textColor);
  background-color: v-bind(backgroundColor);

  &.disabled {
    @apply cursor-not-allowed pointer-events-none;
    background-color: v-bind('backgroundColor + "88"');
    &.btn-text {
      color: v-bind('textColor + "88"');
    }
  }

  &--round {
    @apply rounded-full p-0 flex items-center justify-center;
    &.btn {
      &--sm {
        @apply w-6 h-6;
      }
      &--md {
        @apply w-7 h-7;
      }
      &--lg {
        @apply w-8 h-8;
      }
      &--xl {
        @apply w-11 h-11;
      }
      &--xxl {
        @apply w-11 h-11;
      }
    }
  }

  &:hover:not(.disabled) {
    @apply text-white;
    background-color: v-bind('backgroundColor + "88"');
  }

  &.plain-text:hover:not(.disabled) {
    color: v-bind('textColor + "88"');
  }

  & + .btn {
    @apply mr-3;
  }
  &--sm {
    @apply text-xs;
  }
  &--md {
    @apply text-sm;
  }
  &--lg {
    @apply text-[16px];
  }
  &--xl {
    @apply text-xl;
  }
  &--xxl {
    @apply text-2xl;
  }

  &--responsive {
    @apply text-xs;

    @screen sm {
      @apply text-xs;
    }
    @screen md {
      @apply text-sm;
    }
    @screen lg {
      @apply text-[16px];
    }
    @screen xl {
      @apply text-xl;
    }
    @screen xxl {
      @apply text-2xl;
    }
  }
}
</style>
