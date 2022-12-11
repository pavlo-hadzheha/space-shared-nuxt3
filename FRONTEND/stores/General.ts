import { EGlobalStateName, ISpaceCategory, ISpaceFeature } from '@/types'

export const useGeneral = defineStore(EGlobalStateName.GENERAL, () => {
  const loading = ref(false)
  const spaceFeatures = ref<ISpaceFeature[]>([])
  const spaceCategories = ref<ISpaceCategory[]>([])

  async function getSpaceFeatures () {
    spaceFeatures.value = await $fetch<ISpaceFeature[]>(useBaseURL('/features'))
    return spaceFeatures
  }
  async function getSpaceCategories () {
    spaceCategories.value = await $fetch<ISpaceCategory[]>(useBaseURL('/categories'))
    return spaceCategories
  }
  return {
    loading,
    spaceFeatures,
    spaceCategories,
    getSpaceFeatures,
    getSpaceCategories
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGeneral, import.meta.hot))
}
