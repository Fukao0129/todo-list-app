import { defineStore } from "pinia";
import type { User } from "@/types/api";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);

  /** ユーザー情報更新 */
  const updateUser = async () => {
    const { user: newUser, refreshIdentity } = useSanctumAuth();
    await refreshIdentity();
    user.value = newUser.value as User;
  };

  return { user, updateUser };
});
