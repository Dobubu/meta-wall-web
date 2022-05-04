<script setup lang="ts">
import MainMenu from '@/components/menu/MainMenu.vue';
import SubMenu from '@/components/menu/SubMenu.vue';
</script>

<template>
  <MainMenu />

  <div class="bg" bg="repeat" display="flex justify-center" w="full">
    <main h="auto" p="t-12" display="flex justify-center" w="full max-1200px">
      <div w="3/4" p="r-7">
        <router-view></router-view>
      </div>
      <div w="1/4">
        <SubMenu />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  min-height: calc(100vh - 60px);
  background-image: url('@/assets/images/bg.svg');
}
</style>
