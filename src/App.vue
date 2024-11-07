<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { useUserStore } from '@/store/user';
import { useAppStore } from '@/store/app';
import { StorageType } from '@/service/type';

import ReloadPrompt from '@/components/ReloadPrompt.vue';
import Alert from '@/components/common/Alert.vue';

const store = useUserStore();
const { projectName } = storeToRefs(useAppStore());

const storageTheme = () => localStorage.getItem(StorageType.THEME);

onMounted(() => {
  document.title = projectName.value;
});
</script>

<template>
  <ReloadPrompt />
  <Alert />

  <div :class="store.userTheme || storageTheme()">
    <router-view></router-view>
  </div>
</template>

<style lang="scss"></style>
