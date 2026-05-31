<script setup lang="ts">
useHead({ title: "ログイン" });

/* ────────────────────────────────────
 * Composables
 * ──────────────────────────────────── */
const { login } = useSanctumAuth();
const { showSnackbar } = useSnackbar();

/* ────────────────────────────────────
 * ログイン
 * ──────────────────────────────────── */
/** ログインフォーム */
const loginForm = ref({
  email: "test@example.com",
  password: "password",
});

/** ログイン処理 */
const onLogin = async () => {
  try {
    await login({
      email: loginForm.value.email,
      password: loginForm.value.password,
    });
  } catch {
    showSnackbar(
      "ログインに失敗しました。メールアドレスとパスワードを確認してください。",
      "error",
    );
  }
};
</script>

<template>
  <NuxtLayout name="login">
    <form @submit.prevent>
      <FormItem :has-border="false">
        <BaseInput
          v-model="loginForm.email"
          label="メールアドレス"
          placeholder="メールアドレス"
          type="email"
        />
      </FormItem>
      <FormItem :has-border="false">
        <BaseInput
          v-model="loginForm.password"
          label="パスワード"
          placeholder="パスワード"
          type="password"
        />
      </FormItem>

      <NuxtLink
        to="/forgot-password"
        class="block text-xs my-4 text-primary hover:underline"
        >パスワードを忘れた方はこちら</NuxtLink
      >

      <BaseButton text="ログイン" :on-click="onLogin" type="submit" />
    </form>
  </NuxtLayout>
</template>
