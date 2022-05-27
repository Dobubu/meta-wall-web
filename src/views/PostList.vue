<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { usePost } from '@/service/usePost';
import { SortType } from '@/plugins/post';
import PostItem from '@/components/post/PostItem.vue';
import { useUserStore } from '@/store/user';

const store = useUserStore();

const route = useRoute();
const router = useRouter();
const postService = usePost();

const list = computed(() => postService.list.value);
const isLoading = computed(() => postService.loading.list);

const getQueryObject = computed(() => {
  return {
    ...route.query,
  };
});

const sort = ref(SortType.DESC);
const keyWord = ref('');

const search = async () => {
  const dict = {
    ...getQueryObject.value,
    q: keyWord.value,
    sort: sort.value,
  };

  await router.push({
    name: 'Post',
    query: dict,
  });
  await postService.fetchList(dict);
};

onMounted(async () => {
  const { q, sort: querySort } = route.query;
  if (q) {
    keyWord.value = q as string;
  }
  if (querySort) {
    sort.value = querySort as SortType;
  }

  await postService.fetchList(getQueryObject.value);
});
</script>

<template>
  <div display="flex flex-col md:flex-row" m="b-4">
    <div position="relative" m="b-1.5 md:b-0 md:r-3">
      <select v-model="sort" w="full md:156px" p="y-2.5 x-4" border="2 dark-500" @change="search">
        <option :value="SortType.DESC">從新到舊</option>
        <option :value="SortType.ASC">從舊到新</option>
      </select>
    </div>

    <div display="flex" w="full">
      <input
        v-model="keyWord"
        type="text"
        placeholder="搜尋貼文"
        border="2 dark-500"
        w="full"
        h="12"
        p="l-6"
        @keyup.enter="search"
      />
      <button
        transition="duration-base"
        w="12"
        h="12"
        border="2 dark-500 rounded-none"
        bg="primary hover:active"
        text="white hover:dark-500"
        @click="search"
      >
        <font-awesome-icon :icon="['fa', 'magnifying-glass']" size="lg" />
      </button>
    </div>
  </div>

  <p m="b-4">total: {{ list.length }}</p>

  <template v-if="isLoading">
    <div h="8/10" display="flex items-center justify-center">loading...</div>
  </template>
  <template v-else>
    <template v-if="list.length">
      <PostItem v-for="o in list" :key="o._id" :post="o" :user="store.user" />
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
</template>

<style scoped></style>
