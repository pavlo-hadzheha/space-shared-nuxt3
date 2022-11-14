import { EGlobalStateName } from '@/types'

export const useGeneral = defineStore(EGlobalStateName.GENERAL, {
  state: () => {
    return {
      loading: false
    }
  }
})
