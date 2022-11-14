import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { buildRouter } from './build-config/router/router-builder'
import { buildComponentsAutoImports, buildScriptsAutoImports } from './build-config/auto-imports'

const lifecycle = process.env.npm_lifecycle_event

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseUrl: 'http://localhost:4000'
    }
  },
  css: [
    '@/assets/styles/main.scss'
  ],

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    ['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }]
    // './modules/icon-module'
  ],
  buildModules: [
    '@vueuse/nuxt'
  ],
  alias: {
    pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs'
  },

  imports: {
    dirs: ['./stores']
  },
  vite: {
    plugins: [
      Components({
        dts: lifecycle === 'dev' && './dts/components.d.ts',
        dirs: [],
        resolvers: [ElementPlusResolver({ importStyle: false })]
      })
    ]
  },

  hooks: {
    'components:dirs': buildComponentsAutoImports,
    'imports:extend': buildScriptsAutoImports,
    'pages:extend': buildRouter
  }
})
