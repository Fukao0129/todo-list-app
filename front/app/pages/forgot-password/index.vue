<script setup lang="ts">
definePageMeta({
  sanctum: { excluded: true },
});
useHead({ title: "パスワードリセットメールの送信" });

/* ────────────────────────────────────
 * Composables
 * ──────────────────────────────────── */
const { callApi } = useApi();
const { showSnackbar } = useSnackbar();

/* ────────────────────────────────────
 * パスワードリセットメール送信
 * ──────────────────────────────────── */
/** パスワードリセットメール送信フォーム */
const email = ref<string>("");

/** パスワードリセットメール送信処理 */
const submitPasswordReset = async () => {
  try {
    await callApi(`/forgot-password`, {
      method: "POST",
      body: { email: email.value },
    });
    showSnackbar("パスワードリセットメールを送信しました");
  } catch {
    showSnackbar("パスワードリセットメールの送信に失敗しました。", "error");
  }
};
</script>

<template>
  <NuxtLayout name="login">
    <form @submit.prevent="submitPasswordReset()">
      <FormItem :has-border="false">
        <BaseInput
          v-model="email"
          label="メールアドレス"
          placeholder="メールアドレスを入力してください"
          type="email"
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
