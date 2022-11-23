export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuth()
  const general = useGeneral()

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
