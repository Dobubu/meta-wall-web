<script setup lang="ts">
import { useUserStore } from '@/store/user';
import { StorageType } from '@/service/type';

import ReloadPrompt from '@/components/ReloadPrompt.vue';

const store = useUserStore();

const storageTheme = () => localStorage.getItem(StorageType.THEME);
</script>

<template>
  <ReloadPrompt />
  <div :class="storageTheme() || store.userTheme">
    <router-view></router-view>
  </div>
</template>

<style lang="scss"></style>
