import { addPlugin, defineNuxtModule, createResolver, addComponentsDir } from '@nuxt/kit'

export default defineNuxtModule({
  setup () {
    const { resolve } = createResolver(import.meta.url)
    addPlugin(resolve('./plugin.ts'))
    addComponentsDir({
      path: resolve('./components')
    })
  }
})
