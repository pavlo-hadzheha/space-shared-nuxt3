import { useBaseURL } from '@/composables/useBaseURL'
import { EGlobalStateName, ILoginPayload, IRegisterPayload, IUser, TNullableField } from '@/types'

enum EAuthKeys {
  TOKEN = 'space-shared-JWT-token',
  USER_ID = 'space-shared-user-id'
}

export const useAuth = defineStore(EGlobalStateName.AUTH, {
  state: () => {
    return {
      isLoggedIn: false,
      token: useLocalStorage<TNullableField<string>>(EAuthKeys.TOKEN, null),
      userId: useLocalStorage<TNullableField<string>>(EAuthKeys.USER_ID, null),
      user: null as TNullableField<IUser>
    }
  },
  actions: {
    async login (_payload: ILoginPayload) {
      const response = await $fetch<string>(useBaseURL('/auth/login'), {
        method: 'POST',
        body: _payload
      })
      this.token = response
      await this.getUserProfile()
      useLocalStorage(EAuthKeys.TOKEN, response)
      this.isLoggedIn = true
    },
    async register (_payload: IRegisterPayload) {
      const response = await $fetch<string>(useBaseURL('/auth/register'), {
        method: 'POST',
        body: _payload
      })
      this.token = response
      await this.getUserProfile()
      useLocalStorage(EAuthKeys.TOKEN, response)
      this.isLoggedIn = true
    },
    logout () {
      console.log('logging out')

      this.isLoggedIn = false
      this.token = null
      this.userId = null
      useLocalStorage(EAuthKeys.TOKEN, null).value = undefined
      useLocalStorage(EAuthKeys.USER_ID, null).value = undefined
      useRouter().replace('/auth')
    },
    async getUserProfile () {
      const data = await $fetch<IUser>(useBaseURL('/users/me'), {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      this.user = data
      if (this.user) {
        useLocalStorage(EAuthKeys.USER_ID, this.user.id)
        this.userId = this.user.id
      } else {
        this.logout()
      }
    }
  },

  hydrate (store) {
    store.token = useLocalStorage<TNullableField<string>>(EAuthKeys.TOKEN, null).value
    store.userId = useLocalStorage<TNullableField<string>>(EAuthKeys.USER_ID, null).value
    store.isLoggedIn = !!store.token
    // console.log('isLoggedIn', store.isLoggedIn, useLocalStorage<TNullableField<string>>(EAuthKeys.TOKEN, null).value)
  }

})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
}
