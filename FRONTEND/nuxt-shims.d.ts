/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/naming-convention */

import { EComponentSize, EComponentType } from '~/types'
import { routeNames } from '~/build-config/router/route-names'
import { FontAwesomeIconsList } from '~/plugins/font-awesome.plugin'

interface IGlobalProperties {
  $componentType: typeof EComponentType
  $componentSize: typeof EComponentSize
  $routeNames: typeof routeNames
  $icons: typeof FontAwesomeIconsList
}

interface IRouteMeta {
  requireAuth?: boolean
  pageLabel?: string
  navOrder?: number
}

declare module '@nuxt/schema' {
  interface RuntimeConfig {
    // env
  }
}

declare module '#app' {
  interface NuxtApp extends IGlobalProperties {}
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends IGlobalProperties {}
}

declare module 'vue-router' {
  interface RouteMeta extends IRouteMeta {}
}

declare module 'nuxt/dist/pages/runtime/composables' {
  interface PageMeta extends IRouteMeta {}
}

// It is always important to ensure you import/export something when augmenting a type
export {}
