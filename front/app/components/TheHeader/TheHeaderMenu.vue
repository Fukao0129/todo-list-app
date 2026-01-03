<script setup lang="ts">
const { logout } = useSanctumAuth();
const { user } = useUserStore();

const userMenus = [
  {
    icon: "user-gear",
    label: "設定",
    event: () => {
      navigateTo("/profile");
    },
  },
  {
    icon: "arrow-right-from-bracket",
    label: "ログアウト",
    event: () => {
      logout();
    },
  },
];
</script>

<template>
  <div class="p-4 border-b border-neutral-subtle text-center">
    <BaseIcon icon="circle-user" color="primary" />
    <BaseText>{{ user?.name }}</BaseText>
    <BaseText size="small" color="secondary">{{ user?.email }}</BaseText>
  </div>
  <DropdownMenuItem
    v-for="menu in userMenus"
    :key="menu.label"
    :icon="menu.icon"
    icon-color="secondary"
    :label="menu.label"
    :event="menu.event"
  />
</template>
