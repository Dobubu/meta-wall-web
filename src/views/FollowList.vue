<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { RouterLink } from 'vue-router';

import { useUser } from '@/service/useUser';
import { dayTimeToNow } from '@/plugins/formate';

import TitleBlock from '@/components/TitleBlock.vue';

const userService = useUser();

const list = computed(() => userService.followList.value);

onMounted(async () => {
  await userService.fetchUserFollowingList();
});
</script>

<template>
  <TitleBlock>追蹤名單</TitleBlock>

  <div
    v-for="o in list"
    :key="o._id"
    display="flex justify-between items-end"
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
        <p text="14px dark-300">追蹤時間：{{ o.createdAt }}</p>
      </div>
    </div>
    <p text="14px dark-500">您已追蹤 {{ dayTimeToNow(o.createdAt) }} !</p>
  </div>
</template>

<style scoped></style>
