<script setup lang="ts">
definePageMeta({
  sanctum: { excluded: true },
});
useHead({ title: "パスワードリセット" });

/* ────────────────────────────────────
 * Composables
 * ──────────────────────────────────── */
const route = useRoute();
const { callApi } = useApi();
const { handleError } = useApiErrorHandler();
const { validationErrors, clearErrorMessages } = useValidationErrors();

/* ────────────────────────────────────
 * パスワードリセット
 * ──────────────────────────────────── */
/** トークンとメールアドレスをパラメータから取得 */
const { token, email } = route.query;

/** パスワードリセットフォーム */
const passwordFormData = ref({
  token: token || "",
  email: email || "",
  password: "",
  password_confirmation: "",
});

/** パスワードリセット処理 */
const resetPassword = async () => {
  clearErrorMessages();
  try {
    await callApi(`/password/reset`, {
      method: "POST",
      body: passwordFormData.value,
    });
    navigateTo("/login");
  } catch (error) {
    handleError(error, "reset-password");
  }
};
</script>
<template>
  <NuxtLayout name="login">
    <form @submit.prevent="resetPassword()">
      <FormItem :has-border="false">
        <BaseInput
          v-model="passwordFormData.password"
          placeholder="パスワードを入力してください"
          label="パスワード"
          type="password"
          :error-message="validationErrors['reset-password.password']"
        />
      </FormItem>
      <FormItem :has-border="false">
        <BaseInput
          v-model="passwordFormData.password_confirmation"
          placeholder="パスワードを入力してください"
          label="パスワード(確認)"
          type="password"
          :error-message="
            validationErrors['reset-password.password_confirmation']
          "
        />
      </FormItem>
      <BaseButton text="パスワードをリセットする" class="mt-4" />
    </form>
  </NuxtLayout>
</template>
