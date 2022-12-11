export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuth()
  const general = useGeneral()

  console.log('guard', auth.token)

  if (auth.isLoggedIn) {
    if (!auth.user) {
      general.loading = true
      try {
        await auth.getUserProfile()
      } finally {
        general.loading = false
      }
    }
  }
})
