<script setup lang="ts">
import { ref, computed } from 'vue';

import TitleBlock from '@/components/TitleBlock.vue';

const activeTab = ref('info');
const tabList = ref([
  {
    type: 'info',
    title: '暱稱修改',
  },
  {
    type: 'password',
    title: '重設密碼',
  },
]);
const nickName = ref('');
const selected = ref('');

const password = ref('');
const repeatPassword = ref('');

const updateActive = (type: string) => {
  activeTab.value = type;
};

const isActive = (type: string) =>
  activeTab.value === type ? 'bg-dark-500 text-white' : 'bg-white';

const isResetPassword = computed(() => {
  return {
    'bg-disable-100 cursor-not-allowed':
      !password.value || !repeatPassword.value || password.value !== repeatPassword.value,
    'bg-active text-dark-500':
      password.value && repeatPassword.value && password.value === repeatPassword.value,
  };
});
</script>

<template>
  <TitleBlock>修改個人資料</TitleBlock>

  <div display="flex flex-col" w="min-500px">
    <div>
      <button
        v-for="o in tabList"
        :key="o.title"
        type="button"
        :class="isActive(o.type)"
        p="y-2 x-6"
        m="first:l-4"
        border="2 rounded-t-8px dark-500 border-b-0 rounded-b-none"
        @click="updateActive(o.type)"
      >
        {{ o.title }}
      </button>
    </div>

    <div p="y-8" border="2 rounded-8px dark-500" shadow="item-bottom" bg="white">
      <div v-show="activeTab === 'info'" display="flex flex-col items-center">
        <div className="mb-4">
          <div bg="red-100" border="2 dark-500 rounded-1/2" w="107px" h="107px"></div>
        </div>
        <button type="button" text="white" bg="dark-500" m="b-3" p="y-2 x-6">上傳大頭照</button>

        <div display="flex flex-col" w="3/5">
          <p text="dark-500" m="b-1">暱稱</p>
          <input
            v-model="nickName"
            type="text"
            placeholder="輸入暱稱"
            m="b-4"
            border="2 dark-500"
            w="full"
            h="12"
            p="l-6"
          />

          <p text="dark-500" m="b-2">性別</p>
          <div display="flex items-center" m="b-9">
            <input v-model="selected" type="radio" name="gender" value="male" m="r-3" />
            <span className="mr-6">男性</span>

            <input v-model="selected" type="radio" name="gender" value="female" m="r-3" />女性
          </div>

          <!-- <div display="flex flex-col justify-center items-center" m="b-4">
            <p text="danger sm">1.圖片寬高比必需為 1:1,請重新輸入</p>
            <p text="danger sm">2.解析度寬度至少 300像素以上,請重新輸入</p>
          </div> -->

          <button
            type="submit"
            bg="active"
            p="y-4"
            text="dark-500"
            border="2 dark-500 rounded-8px"
            shadow="item-bottom"
          >
            送出更新
          </button>
        </div>
      </div>

      <div v-show="activeTab === 'password'" display="flex flex-col items-center">
        <div className="w-3/5">
          <p text="dark" m="b-1">輸入新密碼</p>
          <input
            v-model="password"
            type="text"
            placeholder="請輸入新密碼"
            m="b-4"
            border="2 dark-500"
            w="full"
            h="12"
            p="l-6"
          />

          <p text="dark" m="b-1">再次輸入</p>
          <input
            v-model="repeatPassword"
            type="text"
            placeholder="再次輸入新密碼"
            m="b-6"
            border="2 dark-500"
            w="full"
            h="12"
            p="l-6"
          />

          <button
            :class="isResetPassword"
            type="submit"
            p="y-4"
            w="full"
            text="dark-500"
            border="2 dark-500 rounded-8px"
            shadow="item-bottom"
            :disabled="!password || !repeatPassword"
          >
            重設密碼
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
