<script setup lang="ts">
useHead({ title: "ログイン" });

const { login } = useSanctumAuth();
const { showSnackbar } = useSnackbar();

// ログインフォーム
const loginForm = ref({
  email: "test@example.com",
  password: "password",
});

/** ログイン */
const onLogin = () => {
  login({
    email: loginForm.value.email,
    password: loginForm.value.password,
  }).catch(() => {
    showSnackbar(
      "ログインに失敗しました。メールアドレスとパスワードを確認してください。",
      "error"
    );
  });
};
</script>

<template>
  <NuxtLayout name="login">
    <form @submit.prevent="onLogin">
      <FormItem :has-border="false">
        <BaseInput
          v-model:text="loginForm.email"
          label="メールアドレス"
          placeholder="メールアドレス"
        />
      </FormItem>
      <FormItem :has-border="false">
        <BaseInput
          v-model:text="loginForm.password"
          label="パスワード"
          placeholder="パスワード"
        />
      </FormItem>

      <NuxtLink
        to="/forgot-password"
        class="block text-xs my-4 text-primary hover:underline"
        >パスワードを忘れた方はこちら</NuxtLink
      >

      <BaseButton text="ログイン" />
    </form>
  </NuxtLayout>
</template>
