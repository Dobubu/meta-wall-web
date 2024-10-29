<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import { SortType } from '@/api/post';
import { useUserStore } from '@/store/user';
import { useModalStore } from '@/store/modal';
import { usePost } from '@/service/usePost';

import PostItem from '@/components/post/PostItem.vue';
import CommonModal from '@/components/common/Modal.vue';

const store = useUserStore();
const { updateShowModal } = useModalStore();

const route = useRoute();
const postService = usePost();

const list = computed(() => postService.list.value);
const isLoading = computed(() => postService.loading.list);
const isSearchLoading = computed(() => postService.loading.search);

const getQueryObject = computed(() => {
  return {
    ...route.query,
  };
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

const modalImage = ref('');

const updateModalImage = (image: string) => {
  modalImage.value = image;
  updateShowModal(true);
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
        data-cy="search-post"
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
        class="meta-primary"
        transition="duration-base"
        w="12"
        h="12"
        border="2 dark-500 rounded-none"
        :disabled="isSearchLoading"
        @click="search"
      >
        <font-awesome-icon :icon="['fa', 'magnifying-glass']" size="lg" />
      </button>
    </div>
  </div>

  <p data-cy="posts-total" m="b-4">total: {{ list.length }}</p>

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
        @update-modal-image="updateModalImage"
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

  <CommonModal>
    <template #body>
      <img :src="modalImage" alt="" />
    </template>
  </CommonModal>
</template>

<style scoped></style>
