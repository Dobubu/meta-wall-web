<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();

const dropDownMenu = ref(false);
const menuList = ref(['我的貼文牆', '修改個人資料']);

const showMenu = () => {
  dropDownMenu.value = true;
};

const hideMenu = () => {
  dropDownMenu.value = false;
};

const logout = () => {
  localStorage.clear();

  router.push({
    name: 'Login',
  });
};
</script>

<template>
  <header display="flex justify-center" w="full" bg="white" border="b-3 dark-500">
    <div h="60px" p="y-3" w="full max-1200px" display="flex justify-between items-center">
      <RouterLink :to="{ name: 'Post' }" class="text-26px" font="paytone">MetaWall</RouterLink>

      <div position="relative" cursor="pointer" @mouseover="showMenu" @mouseleave="hideMenu">
        <div display="flex items-center">
          <div
            :style="{
              'background-image':
                'url(https://i.picsum.photos/id/443/200/200.jpg?hmac=ceI_qNYuyS_i8MicdRztsYDJLek0_-IDsEwLhAfaIEo)',
            }"
            bg="center cover no-repeat"
            border="2 dark-500 rounded-1/2"
            w="30px"
            h="30px"
          ></div>
          <div border="b-2 dark-500 hover:primary" m="ml-6.5px" p="x-3.5px" text="hover:primary">
            <p font="bold" text="dark-500" leading="text">Member</p>
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
            <li v-for="o in menuList" :key="o" p="y-2" border="b-2 dark-500" bg="hover:dark-100">
              {{ o }}
            </li>
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

<style lang="scss" scoped></style>
