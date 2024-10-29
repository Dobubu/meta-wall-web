<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useUserStore } from '@/store/user';
import { useModalStore } from '@/store/modal';
import { usePost } from '@/service/usePost';

import PostItem from '@/components/post/PostItem.vue';
import CommonModal from '@/components/common/Modal.vue';

const store = useUserStore();
const { updateShowModal } = useModalStore();

const route = useRoute();
const postService = usePost();

const postInfo = computed(() => postService.postInfo.value);
const isLoading = computed(() => postService.loading.postInfo);

const fetchPostInfo = async () => {
  await postService.fetchPost(route.params.id as string);
};

onMounted(async () => {
  await fetchPostInfo();
});

const updateLike = (postId: string, type: string) => {
  postService.updatePostLike(postId, type);
};

const modalImage = ref('');

const updateModalImage = (image: string) => {
  modalImage.value = image;
  updateShowModal(true);
};
</script>

<template>
  <template v-if="isLoading">
    <div h="8/10" display="flex items-center justify-center" text="20px">
      Loading
      <font-awesome-icon :icon="['fa', 'circle-notch']" pulse size="lg" m="l-2" />
    </div>
  </template>
  <template v-else>
    <template v-if="postInfo">
      <PostItem
        :post="postInfo"
        :user="store.user"
        @update-like="updateLike"
        @fetch-post-info="fetchPostInfo"
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
