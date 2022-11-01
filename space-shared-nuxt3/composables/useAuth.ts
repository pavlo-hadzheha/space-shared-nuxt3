import { EGlobalStateName, IUser, TNullableField } from '@/types'

export const useAuth = () => useState(EGlobalStateName.AUTH, () => ({
  isLoggedIn: false,
  user: null as TNullableField<IUser>
}))
