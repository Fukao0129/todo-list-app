<script setup lang="ts">
const PAGE_TITLE = "ユーザー設定";
useHead({ title: PAGE_TITLE });

const { showSnackbar } = useSnackbar();
const { callApi } = useApi();
const { validationErrors, setErrorMessages, clearErrorMessages } =
  useValidationErrors();
const { user, updateUser } = useUserStore();

/** ユーザー情報更新 */
const userFormData = reactive(structuredClone(toRaw(user)));
const onUpdateUser = () => {
  clearErrorMessages();
  callApi(`/users/${userFormData.id}`, {
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
  <NuxtLayout :has-sidebar="false">
    <!--ページ上部-->
    <PageHeader
      :title="PAGE_TITLE"
      :breadcrumb="[{ label: PAGE_TITLE }]"
      :has-data-length="false"
    />

    <!--ユーザー情報-->
    <BaseCard title="ユーザー情報">
      <form @submit.prevent="onUpdateUser" class="p-4 sm:px-6">
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
        <BaseButton text="更新する" class="mt-4" />
      </form>
    </BaseCard>

    <!--パスワード変更-->
    <BaseCard title="パスワード変更">
      <form @submit.prevent="onUpdatePassword()" class="p-4 sm:px-6">
        <FormItem label="現在のパスワード " label-width="20%">
          <BaseInput
            v-model="passwordFormData.current_password"
            type="password"
            autocomplete="off"
            placeholder="現在のパスワードを入力してください"
            :error-message="
              validationErrors['update-password.current_password']
            "
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
        <BaseButton text="パスワードを変更する" class="mt-4" />
      </form>
    </BaseCard>

    <!--ユーザー削除-->
    <BaseCard title="ユーザー削除"> </BaseCard>
  </NuxtLayout>
</template>
