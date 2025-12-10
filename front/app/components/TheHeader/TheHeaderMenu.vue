<script setup lang="ts">
const { logout } = useSanctumAuth();
const { user } = useUserStore();
</script>

<template>
  <div class="header__user-wrapper">
    <BaseIcon icon="circle-user" color="primary" />
    <BaseText>{{ user?.name }}</BaseText>
    <BaseText size="small" color="secondary">{{ user?.email }}</BaseText>
  </div>
  <DropdownMenuItem
    icon="user-gear"
    icon-color="secondary"
    label="設定"
    :event="
      () => {
        navigateTo('/profile');
      }
    "
  />
  <DropdownMenuItem
    icon="arrow-right-from-bracket"
    icon-color="secondary"
    label="ログアウト"
    :event="
      () => {
        logout();
      }
    "
  />
</template>

<style scoped>
.header__user-wrapper {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}
</style>
