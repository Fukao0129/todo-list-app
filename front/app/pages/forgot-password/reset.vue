<script setup lang="ts">
definePageMeta({
  sanctum: { excluded: true },
});
useHead({ title: "パスワードリセット" });

const route = useRoute();
const { callApi } = useApi();
const { validationErrors, setErrorMessages, clearErrorMessages } =
  useValidationErrors();

// パスワードリセットフォーム
const { token, email } = route.query;
const passwordFormData = ref({
  token: token || "",
  email: email || "",
  password: "",
  password_confirmation: "",
});

/** パスワードリセット */
const onResetPassword = () => {
  clearErrorMessages();
  callApi(`/password/reset`, {
    method: "POST",
    body: passwordFormData.value,
  })
    .then(() => {
      navigateTo("/login");
    })
    .catch((error) => {
      setErrorMessages(error.data.errorMessage, "reset-password");
    });
};
</script>
<template>
  <NuxtLayout name="login">
    <form @submit.prevent="onResetPassword()">
      <FormItem :has-border="false">
        <BaseInput
          v-model:text="passwordFormData.password"
          placeholder="パスワードを入力してください"
          label="パスワード"
          :error-message="validationErrors['reset-password.password']"
        />
      </FormItem>
      <FormItem :has-border="false">
        <BaseInput
          v-model:text="passwordFormData.password_confirmation"
          placeholder="パスワードを入力してください"
          label="パスワード(確認)"
          :error-message="
            validationErrors['reset-password.password_confirmation']
          "
        />
      </FormItem>
      <BaseButton text="パスワードをリセットする" class="mt-4" />
    </form>
  </NuxtLayout>
</template>
