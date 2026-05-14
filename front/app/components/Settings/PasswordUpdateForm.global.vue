<script setup lang="ts">
/* ────────────────────────────────────
 * Composables
 * ──────────────────────────────────── */
const { showSnackbar } = useSnackbar();
const { callApi } = useApi();
const { validationErrors, setErrorMessages, clearErrorMessages } =
  useValidationErrors();

/* ────────────────────────────────────
 * パスワード更新
 * ──────────────────────────────────── */
const passwordFormData = ref({
  current_password: "",
  new_password: "",
  new_password_confirmation: "",
});
const onUpdatePassword = () => {
  clearErrorMessages();
  return callApi(`/password/change`, {
    method: "POST",
    body: passwordFormData.value,
  })
    .then(() => {
      showSnackbar("パスワードを更新しました");
      passwordFormData.value = {
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      };
    })
    .catch((error) => {
      setErrorMessages(error.data.errorMessage, "update-password");
    });
};

onUnmounted(() => {
  clearErrorMessages();
});
</script>

<template>
  <BaseCard title="パスワード変更">
    <form @submit.prevent class="p-4 sm:px-6">
      <FormItem label="現在のパスワード " label-width="20%">
        <BaseInput
          v-model="passwordFormData.current_password"
          type="password"
          autocomplete="off"
          placeholder="現在のパスワードを入力してください"
          :error-message="validationErrors['update-password.current_password']"
        />
      </FormItem>
      <FormItem label="新しいパスワード" label-width="20%">
        <BaseInput
          v-model="passwordFormData.new_password"
          type="password"
          autocomplete="off"
          placeholder="新しいパスワードを入力してください"
          :error-message="validationErrors['update-password.new_password']"
        />
      </FormItem>
      <FormItem
        label="新しいパスワード（確認）"
        :has-border="false"
        label-width="20%"
      >
        <BaseInput
          v-model="passwordFormData.new_password_confirmation"
          type="password"
          autocomplete="off"
          placeholder="新しいパスワードを再度入力してください"
        />
      </FormItem>
      <BaseButton
        text="パスワードを変更する"
        :on-click="onUpdatePassword"
        class="mt-4"
      />
    </form>
  </BaseCard>
</template>
