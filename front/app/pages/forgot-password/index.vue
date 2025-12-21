<script setup lang="ts">
definePageMeta({
  sanctum: { excluded: true },
});
useHead({ title: "パスワードリセットメールの送信" });

const { callApi } = useApi();
const { showSnackbar } = useSnackbar();

/** パスワードリセットメール送信 */
const email = ref<string>("");
const onSubmitPasswordReset = () => {
  callApi(`/forgot-password`, {
    method: "POST",
    body: { email: email.value },
  })
    .then(async () => {
      showSnackbar("パスワードリセットメールを送信しました");
    })
    .catch(() => {
      showSnackbar("パスワードリセットメールの送信に失敗しました。", "error");
    });
};
</script>

<template>
  <NuxtLayout name="login">
    <form @submit.prevent="onSubmitPasswordReset()">
      <FormItem :has-border="false">
        <BaseInput
          v-model:text="email"
          label="メールアドレス"
          placeholder="メールアドレスを入力してください"
        />
      </FormItem>

      <NuxtLink
        to="/login"
        class="block text-xs my-4 text-primary hover:underline"
        >← ログイン画面に戻る</NuxtLink
      >

      <BaseButton text="パスワードリセットメールを送信する" />
    </form>
  </NuxtLayout>
</template>
