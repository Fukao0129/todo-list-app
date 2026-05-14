import type { User } from "@/types/api";
export default defineNuxtRouteMiddleware(() => {
  const { user, isAuthenticated } = useSanctumAuth();
  const userStore = useUserStore();
  console.log("ログイン状態は" + isAuthenticated.value);
  if (user.value) {
    userStore.user = user.value as User;
  }
});
