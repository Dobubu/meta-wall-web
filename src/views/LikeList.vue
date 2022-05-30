<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { RouterLink } from 'vue-router';

import { useUser } from '@/service/useUser';
import { usePost } from '@/service/usePost';

import TitleBlock from '@/components/TitleBlock.vue';

const userService = useUser();
const postService = usePost();

const list = computed(() => userService.likeList.value);

onMounted(async () => {
  await userService.fetchLikeList();
});

const deleteLike = async (postId: string) => {
  try {
    await postService.deleteLike(postId);
    alert('取消成功！');
    userService.updateLikeList(postId);
  } catch (e: any) {
    console.error(e.message);
  }
};
</script>

<template>
  <TitleBlock>我按讚的貼文</TitleBlock>
  <p m="-t-4 b-4">total: {{ list.length }}</p>

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
      <div
        :style="{
          'background-image': `url(${o.user.photo})`,
        }"
        bg="center cover no-repeat"
        border="2 dark-500 rounded-1/2"
        w="40px"
        h="40px"
        m="r-4"
      ></div>
      <div display="flex flex-col justify-center">
        <RouterLink
          :to="{ name: 'UserWall', params: { id: o.user._id } }"
          class="text-dark-500 16px"
          m="b-5px"
          font="bold"
          hover="text-primary underline"
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
        <font-awesome-icon text="primary" :icon="['far', 'thumbs-up']" size="lg" />
        <span text="14px dark-300">取消</span>
      </div>
      <div display="flex flex-col justify-between" cursor="pointer">
        <font-awesome-icon text="dark-500" :icon="['far', 'circle-right']" size="lg" />
        <span text="14px dark-300">查看</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
