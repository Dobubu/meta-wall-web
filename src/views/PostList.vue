<script setup lang="ts">
import { ref } from 'vue';

import PostItem from '@/components/post/PostItem.vue';
import { mock } from './mockData';

const { user, postList } = mock;

const postType = ref('1');
</script>

<template>
  <div display="flex flex-col md:flex-row" m="b-4">
    <div position="relative" m="b-1.5 md:b-0 md:r-3">
      <select v-model="postType" w="full md:156px" p="y-2.5 x-4" border="2 dark-500">
        <option value="1">從新到舊</option>
        <option value="0">從舊到新</option>
      </select>
    </div>

    <div display="flex" w="full">
      <input type="text" placeholder="搜尋貼文" border="2 dark-500" w="full" h="12" p="l-6" />
      <button
        transition="duration-base"
        w="12"
        h="12"
        border="2 dark-500 rounded-none"
        bg="primary hover:active"
        text="white hover:dark-500"
      >
        <font-awesome-icon :icon="['fa', 'magnifying-glass']" size="lg" />
      </button>
    </div>
  </div>

  <template v-if="postList.length">
    <PostItem v-for="o in postList" :key="o.name" :post="o" :user="user" />
  </template>
  <div v-else bg="white" border="2 b-4 dark-500 rounded-lg" w="full min-300px" h="132px">
    <div w="full" h="6" border="b-2 dark-500" display="flex items-center">
      <div w="9px" h="9px" border="rounded" m="l-15.5px r-6px" bg="post-1"></div>
      <div
        v-for="o in ['bg-post-2', 'bg-post-3']"
        :key="o"
        w="9px"
        h="9px"
        border="rounded"
        m="r-6px"
        :class="o"
      ></div>
    </div>
    <div display="flex justify-center items-center" h="100px">
      <p text="dark-300">目前尚無動態，新增一則貼文吧！</p>
    </div>
  </div>
</template>

<style scoped></style>
