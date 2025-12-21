<script setup lang="ts">
const props = defineProps<{
  breadcrumb: { label: string; link?: string }[];
}>();
const breadcrumbList = [{ label: "ホーム", link: "/" }, ...props.breadcrumb];
</script>

<template>
  <nav>
    <ul class="flex items-center text-sm">
      <li
        v-for="(item, index) in breadcrumbList"
        :key="index"
        class="mr-2 after:content-['/'] after:ml-2 last:after:content-['']"
      >
        <template v-if="item.link">
          <NuxtLink :href="item.link" class="underline">{{
            item.label
          }}</NuxtLink>
        </template>
        <template v-else>
          <BaseText color="secondary" size="small" tag="span">{{
            item.label
          }}</BaseText>
        </template>
      </li>
    </ul>
  </nav>
</template>
