<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isLogin = ref(true);

const login = async () => {
  await router.push({ name: 'Post' });
};
</script>

<template>
  <div class="bg" h="screen" bg="repeat" display="flex justify-center items-center">
    <div
      w="869px"
      bg="dark-100"
      shadow="main"
      p="y-96px x-50px"
      display="flex justify-between"
      border="2 dark-500"
    >
      <img alt="login background" src="../assets/images/login.svg" />
      <div>
        <form action="." display="flex flex-col" text="center">
          <h1 leading="text" text="60px primary" font="paytone bold">MetaWall</h1>
          <h2 m="b-9" text="24px dark-500" font="helvetica bold">
            {{ isLogin ? '到元宇宙展開全新社交圈' : '註冊' }}
          </h2>
          <template v-if="!isLogin">
            <input type="text" w="373px" h="51px" border="2 dark-500" m="b-4" placeholder="暱稱" />
            <span m="b-4 -t-2" text="14px danger left">暱稱至少 2 個字元以上</span>
          </template>

          <input type="text" w="373px" h="51px" border="2 dark-500" m="b-4" placeholder="Email" />
          <span m="b-4 -t-2" text="14px danger left">帳號已被註冊，請替換新的 Email！</span>

          <input
            type="text"
            w="373px"
            h="51px"
            border="2 dark-500"
            m="b-8"
            placeholder="Password"
          />
          <span m="b-4 -t-6" text="14px danger left">密碼需至少 8 碼以上，並中英混合</span>

          <span m="b-4" text="14px danger">帳號或密碼錯誤，請重新輸入！</span>
          <template v-if="isLogin">
            <button
              v-if="isLogin"
              transition="duration-base"
              type="submit"
              bg="primary hover:active"
              p="y-4"
              m="b-4"
              text="white hover:dark-500"
              border="2 dark-500 rounded-8px"
              @click="login"
            >
              登入
            </button>
            <span cursor="pointer" text="center" display="block" @click="isLogin = false">
              註冊帳號
            </span>
          </template>
          <template v-else>
            <button
              type="submit"
              transition="duration-base"
              bg="primary hover:active"
              p="y-4"
              m="b-4"
              text="white hover:dark-500"
              border="2 dark-500 rounded-8px"
              @click="isLogin = true"
            >
              註冊
            </button>
            <span cursor="pointer" text="center" display="block" @click="isLogin = true">
              登入
            </span>
          </template>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  background-image: url('@/assets/images/bg.svg');
}
</style>
