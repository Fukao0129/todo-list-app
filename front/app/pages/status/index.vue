<script setup lang="ts">
import type { CreateStatusRequest } from "@/types/api";

const PAGE_TITLE = "ステータス設定";
useHead({ title: PAGE_TITLE });

/* ────────────────────────────────────
 * Composables
 * ──────────────────────────────────── */
const { statusList, pending, addStatus, updateStatus, deleteStatus } =
  useStatus();

/* ────────────────────────────────────
 * ステータス追加モーダル
 * ──────────────────────────────────── */
const isAddStatusModalVisible = ref(false);

/** ステータス追加したらモーダルを閉じる */
const onAddStatus = async (formData: CreateStatusRequest) => {
  return addStatus(formData).then(() => {
    isAddStatusModalVisible.value = false;
  });
};
</script>

<template>
  <NuxtLayout>
    <!--ページ上部-->
    <PageHeader
      :title="PAGE_TITLE"
      :breadcrumb="[{ label: PAGE_TITLE }]"
      :has-data-length="false"
    />
    <BaseText color="secondary" size="small">
      <span
        v-for="status in Object.values(DEFAULT_STATUSES)"
        :key="status.value"
        >「{{ status.label }}」</span
      >
      は変更・削除できません。
    </BaseText>

    <!--ステータス一覧-->
    <AsyncDataCard :pending="pending" :data-length="statusList?.length || 0">
      <StatusCard
        v-for="status in statusList"
        :key="status.id"
        :status
        @on-delete="deleteStatus($event)"
        @on-update="updateStatus(status)"
      />
    </AsyncDataCard>
  </NuxtLayout>

  <!--ステータス追加-->
  <AddIcon @click="isAddStatusModalVisible = true" />
  <AddStatusModal v-model="isAddStatusModalVisible" :on-submit="onAddStatus" />
</template>
