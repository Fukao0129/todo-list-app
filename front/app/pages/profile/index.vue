<script setup lang="ts">
import { cloneDeep } from "lodash";

const PAGE_TITLE = "ユーザー設定";
useHead({ title: PAGE_TITLE });

const { showSnackbar } = useSnackbar();
const { useCustomFetch, callApi } = useApi();
const { validationErrors, setErrorMessages, clearErrorMessages } =
  useValidationErrors();
const { user, updateUser } = useUserStore();

/** ユーザー情報更新 */
const formData = cloneDeep(user);
const onUpdateUser = () => {
  clearErrorMessages();
  callApi(`/users/${formData.id}`, {
    method: "PUT",
    body: formData,
  })
    .then(async () => {
      await updateUser();
      showSnackbar("ユーザー情報を更新しました");
    })
    .catch((error) => {
      setErrorMessages(error.data.errorMessage, "update-user");
    });
};

/** パスワード更新 */
const passwordFormData = ref({
  current_password: "",
  new_password: "",
  new_password_confirmation: "",
});
const onUpdatePassword = () => {
  clearErrorMessages();
  callApi(`/password/change`, {
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
</script>

<template>
  <NuxtLayout>
    <BreadCrumb :breadcrumb="[{ label: PAGE_TITLE }]" />

    <h1>{{ PAGE_TITLE }}</h1>

    <h2>ユーザー情報</h2>
    <BaseCard>
      <form class="user-edit__wrapper" @submit.prevent="onUpdateUser">
        <FormItem label="名前">
          <BaseInput
            v-model:text="formData.name"
            placeholder="名前を入力してください"
            :error-message="validationErrors['update-user.name']"
          />
        </FormItem>
        <FormItem label="メールアドレス" :has-border="false">
          <BaseText>{{ formData.email }}</BaseText>
          <!-- <BaseInput
            v-model:text="formData.email"
            placeholder="メールアドレスを入力してください"
          /> -->
        </FormItem>
        <BaseButton text="更新する" />
      </form>
    </BaseCard>

    <h2>パスワード変更</h2>
    <BaseCard>
      <form class="user-edit__wrapper" @submit.prevent="onUpdatePassword()">
        <FormItem label="現在のパスワード">
          <BaseInput
            v-model:text="passwordFormData.current_password"
            type="password"
            placeholder="現在のパスワードを入力してください"
            :error-message="
              validationErrors['update-password.current_password']
            "
          />
        </FormItem>
        <FormItem label="新しいパスワード">
          <BaseInput
            v-model:text="passwordFormData.new_password"
            type="password"
            placeholder="新しいパスワードを入力してください"
            :error-message="validationErrors['update-password.new_password']"
          />
        </FormItem>
        <FormItem label="新しいパスワード（確認）" :has-border="false">
          <BaseInput
            v-model:text="passwordFormData.new_password_confirmation"
            type="password"
            placeholder="新しいパスワードを再度入力してください"
          />
        </FormItem>
        <BaseButton text="パスワードを変更する" />
      </form>
    </BaseCard>
  </NuxtLayout>
</template>

<style scoped>
.user-edit__wrapper {
  padding: 1rem;
}
</style>
