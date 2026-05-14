<script setup lang="ts">
import type { User } from "@/types/api";

/* ────────────────────────────────────
 * Composables
 * ──────────────────────────────────── */
const { showSnackbar } = useSnackbar();
const { callApi } = useApi();
const { validationErrors, setErrorMessages, clearErrorMessages } =
  useValidationErrors();
const { user, updateUser } = useUserStore();

/* ────────────────────────────────────
 * ユーザー情報更新
 * ──────────────────────────────────── */
const userFormData = reactive<User>(structuredClone(toRaw(user)!));
const onUpdateUser = () => {
  clearErrorMessages();
  return callApi(`/users`, {
    method: "PUT",
    body: userFormData,
  })
    .then(async () => {
      await updateUser();
      showSnackbar("ユーザー情報を更新しました");
    })
    .catch((error) => {
      setErrorMessages(error.data.errorMessage, "update-user");
    });
};

onUnmounted(() => {
  clearErrorMessages();
});
</script>

<template>
  <BaseCard title="ユーザー情報">
    <form @submit.prevent class="p-4 sm:px-6">
      <FormItem label="名前" label-width="20%">
        <BaseInput
          v-model="userFormData.name"
          placeholder="名前を入力してください"
          :error-message="validationErrors['update-user.name']"
        />
      </FormItem>
      <FormItem label="メールアドレス" label-width="20%" :has-border="false">
        <BaseText>{{ userFormData.email }}</BaseText>
      </FormItem>
      <BaseButton text="更新する" :on-click="onUpdateUser" class="mt-4" />
    </form>
  </BaseCard>
</template>
