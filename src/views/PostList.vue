<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import { usePost } from '@/service/usePost';
import { SortType } from '@/api/post';
import PostItem from '@/components/post/PostItem.vue';
import { useUserStore } from '@/store/user';
import { useWebSocket } from '@/plugins/ws';
import { WebSocketEvent } from '@/plugins/type';

const store = useUserStore();

const route = useRoute();
const postService = usePost();
const wsPlugin = useWebSocket();

const list = computed(() => postService.list.value);
const isLoading = computed(() => postService.loading.list);
const isSearchLoading = computed(() => postService.loading.search);

const getQueryObject = computed(() => {
  return {
    ...route.query,
  };
});

const reFetchList = async () => {
  await postService.fetchList();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  postService.isReloadList.value = false;
};

wsPlugin.ws.on(WebSocketEvent.POST_LIST, () => {
  postService.isReloadList.value = true;
});

const sort = ref(SortType.DESC);
const keyWord = ref('');

const search = async () => {
  if (isSearchLoading.value) return;

  const dict = {
    q: keyWord.value,
    sort: sort.value,
  };

  postService.search(dict);
};

const fetchList = async () => {
  await postService.fetchList(getQueryObject.value);
};

onMounted(async () => {
  const { q, sort: querySort } = route.query;
  if (q) {
    keyWord.value = q as string;
  }
  if (querySort) {
    sort.value = querySort as SortType;
  }

  await fetchList();
});

const updateLike = (postId: string, type: string) => {
  postService.updateListLike(postId, type);
};
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
        :disabled="isSearchLoading"
        @keyup.enter="search"
      />
      <button
        transition="duration-base"
        w="12"
        h="12"
        border="2 dark-500 rounded-none"
        bg="primary hover:active"
        text="white hover:dark-500"
        :disabled="isSearchLoading"
        @click="search"
      >
        <font-awesome-icon :icon="['fa', 'magnifying-glass']" size="lg" />
      </button>
    </div>
  </div>

  <p m="b-4">total: {{ list.length }}</p>
  <div
    v-if="postService.isReloadList.value"
    class="animate__animated animate__fadeInDown"
    position="sticky top-15 left-1/3"
    display="inline-block"
    z="20"
    bg="primary"
    text="white"
    cursor="pointer"
    border="rounded-8px"
    p="3"
    m="b-4"
    @click="reFetchList"
  >
    有新動態！
  </div>

  <template v-if="isLoading">
    <div h="8/10" display="flex items-center justify-center" text="20px">
      Loading
      <font-awesome-icon :icon="['fa', 'circle-notch']" pulse size="lg" m="l-2" />
    </div>
  </template>
  <template v-else>
    <template v-if="list.length">
      <PostItem
        v-for="o in list"
        :key="o._id"
        :post="o"
        :user="store.user"
        @update-like="updateLike"
        @fetch-post-list="fetchList"
      />
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
        <p text="dark-300">查無任何貼文！</p>
      </div>
    </div>
  </template>
</template>

<style scoped></style>
