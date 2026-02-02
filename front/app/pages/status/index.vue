<script setup lang="ts">
import type {
  Status,
  CreateStatusRequest,
  UpdateStatusRequest,
} from "@/types/status";

const PAGE_TITLE = "ステータス設定";
useHead({ title: PAGE_TITLE });

const { showSnackbar } = useSnackbar();
const { useCustomFetch, callApi } = useApi();
const { setErrorMessages } = useValidationErrors();

const isAddStatusModalVisible = ref(false); // ステータス追加モーダル表示フラグ

/** ステータス一覧取得 */
const {
  data: statusData,
  pending,
  refresh,
} = useCustomFetch<Status[]>(`/statuses`);

/** ステータス追加 */
const onAddStatus = (formData: CreateStatusRequest) => {
  callApi(`/statuses`, {
    method: "POST",
    body: formData,
  })
    .then(() => {
      isAddStatusModalVisible.value = false;
      showSnackbar("ステータスを追加しました");
      refresh();
    })
    .catch((error) => {
      setErrorMessages(error.data.errorMessage, "add-status");
    });
};

/** ステータス更新 */
const onUpdateStatus = (statusId: number, formData: UpdateStatusRequest) => {
  callApi(`/statuses/${statusId}`, {
    method: "PUT",
    body: formData,
  })
    .then(() => {
      showSnackbar("ステータスを更新しました");
      refresh();
    })
    .catch((error) => {
      setErrorMessages(error.data.errorMessage, "update-status");
    });
};

/** ステータス削除 */
const onDeleteStatus = (statusId: number) => {
  callApi(`/statuses/${statusId}`, {
    method: "DELETE",
  })
    .then(() => {
      showSnackbar("ステータスを削除しました");
      refresh();
    })
    .catch(() => {
      showSnackbar(ERROR_TEXT, "error");
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
    <AsyncDataCard :pending="pending" :data-length="statusData?.length || 0">
      <StatusCard
        v-for="status in statusData"
        :key="status.id"
        :status
        @onDelete="onDeleteStatus"
        @onUpdate="onUpdateStatus"
      />
    </AsyncDataCard>
  </NuxtLayout>

  <!--ステータス追加-->
  <AddIcon @click="isAddStatusModalVisible = true" />
  <AddStatusModal v-model="isAddStatusModalVisible" @submit="onAddStatus" />
</template>
