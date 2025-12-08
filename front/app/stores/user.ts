import { defineStore } from "pinia";
import type { User } from "@/types/user";

export const useUserStore = defineStore("user", () => {
  const user = ref({} as User);

  /** ユーザー情報更新 */
  const updateUser = async () => {
    const { user: newUser, refreshIdentity } = useSanctumAuth();
    await refreshIdentity();
    user.value = newUser.value as User;
  };

  return { user, updateUser };
});
