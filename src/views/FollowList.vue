<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { RouterLink } from 'vue-router';

import { useUser } from '@/service/useUser';
import { dayTimeToNow } from '@/lib/formate';
import { useUserPhoto } from '@/lib/useUserPhoto';

import TitleBlock from '@/components/TitleBlock.vue';
import UserItem from '@/components/UserItem.vue';

const userService = useUser();
const userPhotoService = useUserPhoto();

const list = computed(() => userService.followList.value);
const isLoading = computed(() => userService.loading.followingList);

onMounted(async () => {
  await userService.fetchUserFollowingList();
});
</script>

<template>
  <TitleBlock>追蹤名單</TitleBlock>
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
        display="flex justify-between items-end"
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
            <p text="14px dark-300">追蹤時間：{{ o.createdAt }}</p>
          </div>
        </div>
        <p text="14px dark-500">您已追蹤 {{ dayTimeToNow(o.createdAt) }} !</p>
      </div>
    </template>
    <template v-else>
      <p>目前無任何追蹤名單！</p>
    </template>
  </template>
</template>

<style scoped></style>
