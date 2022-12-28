<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
import { useWebSocket } from '@/plugins/ws';

import UserItem from '@/components/UserItem.vue';

const router = useRouter();
const store = useUserStore();
const wsPlugin = useWebSocket();

const dropDownMenu = ref(false);
const menuList = ref([
  {
    title: '修改個人資料',
    routerName: 'Edit',
  },
]);

const showMenu = () => {
  dropDownMenu.value = true;
};

const hideMenu = () => {
  dropDownMenu.value = false;
};

const logout = () => {
  localStorage.clear();
  wsPlugin.ws.close();

  alert('登出成功！');

  router.push({
    name: 'Login',
  });
};
</script>

<template>
  <header display="flex justify-center" w="full" bg="white" border="b-3 dark-500">
    <div h="60px" p="y-3" w="full max-1200px" display="flex justify-between items-center">
      <RouterLink :to="{ name: 'Post' }" class="meta-primary-text text-26px" font="paytone"
        >MetaWall</RouterLink
      >

      <div
        v-if="store.user"
        data-cy="main-menu"
        position="relative"
        cursor="pointer"
        @mouseover="showMenu"
        @mouseleave="hideMenu"
      >
        <div display="flex items-center">
          <UserItem :photo="store.user.photo" size="30px" margin="0" />

          <div class="line" border="b-2 dark-500" m="ml-6.5px" p="x-3.5px">
            <p font="bold" class="meta-primary-text-hover" leading="text">
              {{ store.user.name }}
            </p>
          </div>
          <ul
            v-show="dropDownMenu"
            cursor="pointer"
            position="absolute -bottom-32 -left-1"
            text="center"
            w="182px"
            border="2 dark-500"
            bg="white"
            z="10"
          >
            <RouterLink :to="{ name: 'UserWall', params: { id: store.user._id } }">
              <li p="y-2" border="b-2 dark-500" bg="hover:dark-100">我的貼文牆</li>
            </RouterLink>
            <template v-for="o in menuList" :key="o.title">
              <RouterLink :to="{ name: o.routerName }">
                <li p="y-2" border="b-2 dark-500" bg="hover:dark-100">
                  {{ o.title }}
                </li>
              </RouterLink>
            </template>

            <li p="y-2" bg="hover:dark-100" @click="logout">登出</li>
          </ul>
          <div
            v-show="dropDownMenu"
            position="absolute -bottom-34 left-1"
            w="182px"
            h="32"
            border="2 dark-500"
            bg="white"
          ></div>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.line {
  &:hover {
    border-color: var(--primary);
  }
}
</style>
