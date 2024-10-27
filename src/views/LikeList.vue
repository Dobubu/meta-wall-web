<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { RouterLink } from 'vue-router';

import { useAlertStore, AlertState } from '@/store/alert';
import { useUser } from '@/service/useUser';
import { usePost } from '@/service/usePost';
import { useUserPhoto } from '@/lib/useUserPhoto';

import TitleBlock from '@/components/TitleBlock.vue';
import UserItem from '@/components/UserItem.vue';

const { show: showAlert } = useAlertStore();

const userService = useUser();
const postService = usePost();
const userPhotoService = useUserPhoto();

const list = computed(() => userService.likeList.value);
const isLoading = computed(() => userService.loading.likeList);

onMounted(async () => {
  await userService.fetchLikeList();
});

const deleteLike = async (postId: string) => {
  try {
    await postService.deleteLike(postId);
    showAlert('取消成功！', AlertState.SUCCESS);

    userService.updateLikeList(postId);
  } catch (e: any) {
    console.error(e.message);
  }
};
</script>

<template>
  <TitleBlock>我按讚的貼文</TitleBlock>
  <p m="-t-4 b-4">total: {{ list.length }}</p>

  <template v-if="isLoading">
    <div h="8/10" display="flex items-center justify-center" text="20px">
      Loading
      <font-awesome-icon :icon="['fa', 'circle-notch']" pulse size="lg" m="l-2" />
    </div>
  </template>
  <template v-else>
    <template v-if="list.length">
      <div
        v-for="o in list"
        :key="o._id"
        display="flex items-stretch justify-between items-end"
        border="2 dark-500 rounded-lg"
        bg="white"
        p="4"
        m="b-4"
        shadow="item-bottom"
      >
        <div display="flex">
          <UserItem :photo="userPhotoService.getUsersPhoto(o.user._id, o.user.photo)" />

          <div display="flex flex-col justify-center">
            <RouterLink
              :to="{ name: 'UserWall', params: { id: o.user._id } }"
              class="meta-primary-text-hover 16px"
              m="b-5px"
              font="bold"
              hover="underline"
            >
              {{ o.user.name }}
            </RouterLink>
            <p text="14px dark-300">發文時間：{{ o.createdAt }}</p>
          </div>
        </div>

        <div display="flex">
          <div
            display="flex flex-col justify-between"
            cursor="pointer"
            m="r-9"
            @click="deleteLike(o._id)"
          >
            <font-awesome-icon class="meta-primary-text" :icon="['far', 'thumbs-up']" size="lg" />
            <span text="14px dark-300">取消</span>
          </div>
          <RouterLink :to="{ name: 'PostInfo', params: { id: o._id } }">
            <div display="flex flex-col justify-between" cursor="pointer" h="full">
              <font-awesome-icon text="dark-500" :icon="['far', 'circle-right']" size="lg" />
              <span text="14px dark-300">查看</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </template>
    <template v-else>
      <p>目前無任何按讚貼文！</p>
    </template>
  </template>
</template>

<style scoped></style>
