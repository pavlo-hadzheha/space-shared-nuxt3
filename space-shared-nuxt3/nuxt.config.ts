import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { buildRouter } from './build-config/router/router-builder'
import { buildComponentsAutoImports, buildScriptsAutoImports } from './build-config/auto-imports'

const lifecycle = process.env.npm_lifecycle_event

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseUrl: 'http://localhost:4000',
      mapboxApikey: 'pk.eyJ1IjoiYml0b25kbyIsImEiOiJja3cwdWwxeTMxZmh2Mm9sY2g0a283MWljIn0.cAqVx7AR6OaGGEeP6q9aAQ',
      geoConfig: {
        API_KEY: '-8ipf75lS5WCQRSL7SCn7uZd2qwvItcaHibwRdkZfOs', // https://developer.here.com/projects/PROD-b7426d62-eac1-4fab-954d-f7c4f9360e75
        GEOCODE_API: 'https://geocoder.ls.hereapi.com/6.2/geocode.json',
        POS_API: 'https://revgeocode.search.hereapi.com/v1/revgeocode'
      }
    }
  },
  devServerHandlers: [],
  css: ['@/assets/styles/main.scss'],
  // postcss: {
  //   plugins: {
  //     tailwindcss: {},
  //     autoprefixer: {}
  //   }
  // },

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
