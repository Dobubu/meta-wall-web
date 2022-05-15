<script setup lang="ts">
import { onMounted, computed } from 'vue';

import { useUser } from '@/service//useUser';
import { useUserStore } from '@/store/user';
import MainMenu from '@/components/menu/MainMenu.vue';
import SubMenu from '@/components/menu/SubMenu.vue';

const userService = useUser();
const store = useUserStore();

const userList = computed(() => userService.list.value);

onMounted(async () => {
  await userService.fetchList();
  store.userList = userList.value;
});
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
