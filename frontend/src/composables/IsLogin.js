import { useAuthStore } from '@/stores/auth'

export const isLogin = async () => {
  const authStore = useAuthStore()
  await authStore.getUser()
  let user = authStore.userDetail
  if (user && Object.keys(user).length > 0) {
    return user
  }
  return null
}
