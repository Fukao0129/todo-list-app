<script setup lang="ts">
const { login } = useSanctumAuth();

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
  }).catch((error) => {
    console.error("Login failed:", error);
  });
};
</script>

<template>
  <NuxtLayout name="login">
    <div class="login-page__wrapper">
      <div class="login-page__container">
        <BaseCard>
          <div class="login-page__content">
            <img
              src="/assets/img/logo-color.svg"
              alt="TODO"
              class="login-page__logo"
            />
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

              <NuxtLink to="/forgot-password" class="password-reset__link"
                >パスワードを忘れた方はこちら</NuxtLink
              >

              <BaseButton text="ログイン" />
            </form>
          </div>
        </BaseCard>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.login-page__wrapper {
  height: 100vh;
  background: var(--background-color);
  display: flex;
  justify-content: center;
  .login-page__container {
    max-width: 30rem;
    margin: auto;
    width: 90%;
    .login-page__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      text-align: center;
      .login-page__logo {
        max-width: 10rem;
        width: 100%;
        height: auto;
      }
      .password-reset__link {
        font-size: 0.8rem;
        color: var(--primary-color);
        margin: 1rem 0 1.5rem;
        display: block;
      }
    }
  }
}
</style>
