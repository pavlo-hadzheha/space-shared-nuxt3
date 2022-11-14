import { useBaseURL } from '@/composables/useBaseURL'
import { EGlobalStateName, ILoginPayload, IRegisterPayload, IUser, TNullableField } from '@/types'

export const useAuth = defineStore(EGlobalStateName.AUTH, {
  state: () => {
    return {
      isLoggedIn: false,
      token: useLocalStorage('space-shared-JWT-token', null),
      userId: useLocalStorage('space-shared-user-id', null),
      user: null as TNullableField<IUser>
    }
  },
  getters: {},
  actions: {
    async login (_payload: ILoginPayload) {
      console.log()
      const { data } = await useFetch(useBaseURL('/auth/login'), {
        method: 'POST',
        body: _payload
      })
      this.token = data.value
      await this.getUserProfile()
      useLocalStorage('space-shared-JWT-token', this.token)
      this.isLoggedIn = true
    },
    async register (_payload: IRegisterPayload) {
      const { data } = await useFetch(useBaseURL('/auth/register'), {
        method: 'POST',
        body: _payload
      })
      this.token = data.value
      await this.getUserProfile()
      useLocalStorage('space-shared-JWT-token', this.token)
      this.isLoggedIn = true
    },
    logout () {
      this.isLoggedIn = false
      this.token = null
      useLocalStorage('space-shared-JWT-token', null).value = undefined
      useRouter().replace('/auth')
    },
    async getUserProfile () {
      const { data } = await useFetch(useBaseURL('/users/me'), {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      this.user = data
      useLocalStorage('space-shared-user-id', this.user.id)
      this.userId = this.user.id
    }
  },
  hydrate (storeState) {
    storeState.token = useLocalStorage('space-shared-JWT-token', null).value
    storeState.userId = useLocalStorage('space-shared-user-id', null).value
    storeState.isLoggedIn = !!storeState.token
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
}
