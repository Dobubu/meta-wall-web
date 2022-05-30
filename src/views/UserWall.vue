<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';

import { useRoute } from 'vue-router';
import { usePost } from '@/service/usePost';
import { useUser } from '@/service//useUser';
import { useAuth } from '@/service/useAuth';
import { useUserStore } from '@/store/user';

import PostItem from '@/components/post/PostItem.vue';

const route = useRoute();
const store = useUserStore();

const userService = useUser();
const postService = usePost();
const authService = useAuth();

const isFollow = ref(false);
const postType = ref('1');
const userInfo = ref();

const followText = computed(() => (isFollow.value ? '取消追蹤' : '追蹤'));

const updateFollow = () => {
  isFollow.value = !isFollow.value;
};

const list = computed(() => postService.userPostList.value);
const userId = computed(() => route.params.id as string);
const showUserBlock = computed(() => route.params.id !== authService.getUserId() && userInfo.value);

watch(
  () => userId.value,
  async v => {
    if (v) {
      await postService.fetchUserPostsList(v);
    }
  },
);

onMounted(async () => {
  userInfo.value = await userService.fetchProfile(userId.value);
  await postService.fetchUserPostsList(userId.value);
});
</script>

<template>
  <div v-if="showUserBlock" position="relative" w="full min-500px" h="20" m="b-4">
    <div
      position="absolute top-0 left-0"
      border="2 dark-500 rounded-8px"
      display="flex items-center justify-between"
      w="full"
      h="full"
      bg="white"
      z="10"
      p="r-4"
    >
      <div display="flex" border="rounded-8px">
        <div
          :style="{
            'background-image': `url(${userInfo.photo})`,
          }"
          bg="center cover no-repeat"
          display="flex justify-center items-center"
          position="relative"
          m="r-4"
          w="min-80px"
          h="20"
          overflow="hidden"
          border="r-2 t-2 b-2 dark-500 rounded-l-8px"
        ></div>
        <div display="flex flex-col justify-center">
          <p text="16px dark-500" m="b-1" font="bold">{{ userInfo.name }}</p>
          <p text="16px dark-500">? 人追蹤</p>
        </div>
      </div>
      <button
        type="button"
        :class="{ 'bg-dark-600': isFollow, 'bg-active': !isFollow }"
        border="2 dark-500 rounded-lg"
        shadow="item-bottom"
        text="dark-500"
        font="bold"
        p="y-1.5"
        w="96px"
        @click="updateFollow"
      >
        {{ followText }}
      </button>
    </div>
    <div
      position="absolute -bottom-2 -left-2"
      border="2 dark-500 rounded-8px"
      w="full"
      h="full"
      bg="white"
    ></div>
  </div>

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

  <p m="b-4">total: {{ list.length }}</p>

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

<style scoped></style>
