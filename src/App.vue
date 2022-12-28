<script setup lang="ts">
import { useUserStore } from '@/store/user';

import ReloadPrompt from '@/components/ReloadPrompt.vue';

const store = useUserStore();
</script>

<template>
  <ReloadPrompt />
  <div :class="store.userTheme">
    <router-view></router-view>
  </div>
</template>

<style lang="scss"></style>
