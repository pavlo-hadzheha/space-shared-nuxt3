import { defineNuxtPlugin } from '#app'
import { EBreakpoint, EButtonSize, EComponentSize, EComponentType } from '~/types'
import { routeNames } from '~/build-config/router/route-names'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      componentType: EComponentType,
      componentSize: EComponentSize,
      routeNames,
      mq: reactive({
        xxl: useMediaQuery(`(min-width: ${EBreakpoint.XXL}px)`),
        xl: useMediaQuery(`(min-width: ${EBreakpoint.XL}px)`),
        lg: useMediaQuery(`(min-width: ${EBreakpoint.LG}px)`),
        md: useMediaQuery(`(min-width: ${EBreakpoint.MD}px)`),
        sm: useMediaQuery(`(min-width: ${EBreakpoint.SM}px)`)
      }),
      bp: EBreakpoint,
      buttonSize: EButtonSize
    }
  }
})
