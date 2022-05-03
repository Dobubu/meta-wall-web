<script setup lang="ts">
import MainMenu from '@/components/menu/MainMenu.vue';
</script>

<template>
  <MainMenu />

  <div class="bg" bg="repeat" h="full" display="flex justify-center" w="full">
    <main h="auto" p="t-12" w="full max-1200px">
      <router-view></router-view>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  background-image: url('@/assets/images/bg.svg');
}
</style>
