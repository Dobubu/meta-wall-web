<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import { useUserStore } from '@/store/user';
import { useWebSocket } from '@/plugins/ws';
import { useUserPhoto } from '@/lib/useUserPhoto';

import UserItem from '@/components/UserItem.vue';

const route = useRoute();
const store = useUserStore();
const wsPlugin = useWebSocket();
const userPhotoService = useUserPhoto();

const menuList = ref([
  {
    title: '追蹤名單',
    icon: ['far', 'bell'],
    routerName: 'Follow',
  },
  {
    title: '我按讚的文章',
    icon: ['far', 'thumbs-up'],
    routerName: 'Likes',
  },
  {
    title: '聊天大廳',
    icon: ['far', 'comments'],
    routerName: 'ChatWall',
  },
]);

const showMessagePrompt = ref(false);
const showMessageAnimation = ref(false);

const routeName = computed(() => route.name);

watch(
  () => routeName.value,
  (v, prev) => {
    if (v === 'Post' && prev === 'ChatWall') {
      showMessagePrompt.value = false;
    }
  },
);

watch(
  () => wsPlugin.msgTotal.value,
  v => {
    showMessagePrompt.value = true;
    showMessageAnimation.value = true;

    setTimeout(() => {
      showMessageAnimation.value = false;
    }, 1000);
  },
);

const showPrompt = computed(() => showMessagePrompt.value && routeName.value !== 'ChatWall');
</script>

<template>
  <div
    border="2 dark-500"
    bg="white"
    display="flex flex-col justify-center items-center"
    p="x-6 y-8"
  >
    <RouterLink :to="{ name: 'Create' }" class="w-full">
      <button
        data-cy="menu-add-post-btn"
        class="meta-primary"
        type="button"
        transition="duration-base"
        p="y-3"
        m="b-6"
        border="2 dark-500 rounded-8px"
        w="full"
        font="bold"
      >
        張貼動態
      </button>
    </RouterLink>

    <ul w="full">
      <li v-if="store.user" cursor="pointer" display="flex items-center">
        <RouterLink :to="{ name: 'Edit' }" class="w-full flex items-center">
          <UserItem
            class="icon"
            :class="{ '!bg-white': store.theme === 'theme-conversation' }"
            :photo="userPhotoService.getUserPhoto.value"
            size="50px"
          />

          <p font="bold">{{ store.user.name }}</p>
        </RouterLink>
      </li>

      <li v-for="o in menuList" :key="o.title" cursor="pointer">
        <RouterLink :to="{ name: o.routerName }" class="w-full flex items-center">
          <div
            class="icon"
            m="r-4"
            display="flex justify-center items-center"
            position="relative"
            border="2 dark-500 rounded-1/2"
            w="50px"
            h="50px"
          >
            <div
              v-if="showPrompt && o.routerName === 'ChatWall'"
              class="animate__animated"
              :class="{ animate__bounce: showMessageAnimation }"
              bg="red-500"
              border="rounded-1/2"
              w="15px"
              h="15px"
              position="absolute right-0 -top-1"
            ></div>
            <font-awesome-icon :icon="o.icon" size="lg" />
          </div>
          <div display="flex flex-col">
            <p v-if="o.routerName === 'ChatWall'" text="sm">
              在線人數：{{ wsPlugin.onlineTotal }} 人
            </p>
            <p font="bold">{{ o.title }}</p>
          </div>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
li + li {
  margin-top: 1.25rem;
}

li {
  .icon,
  p {
    @apply transition duration-base;
  }

  .icon {
    background-color: var(--primary);
    color: var(--text);
  }

  &:hover {
    .icon {
      background-color: var(--active);
      color: var(--hover-text);
    }

    p {
      color: var(--primary);
    }
  }
}
</style>
