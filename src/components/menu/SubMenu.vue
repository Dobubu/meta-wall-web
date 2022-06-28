<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import { useWebSocket } from '@/plugins/ws';
import { WebSocketEvent } from '@/plugins/type';
import { useUserStore } from '@/store/user';
import UserItem from '@/components/UserItem.vue';

const route = useRoute();
const store = useUserStore();
const wsPlugin = useWebSocket();

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

const newMsg = ref(false);
const routeName = computed(() => route.name);

watch(
  () => routeName.value,
  v => {
    if (v === 'ChatWall') {
      newMsg.value = false;
    }
  },
);

wsPlugin.ws.on(WebSocketEvent.CHAT_MESSAGE, data => {
  if (routeName.value === 'ChatWall') return;
  console.log('data: ', data);
  if (store.user?._id !== data.user && data) {
    newMsg.value = true;
  }
});
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
        type="button"
        transition="duration-base"
        bg="primary hover:active"
        p="y-3"
        m="b-6"
        text="white hover:dark-500"
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
          <UserItem class="icon" :photo="store.user.photo" size="50px" />

          <p font="bold" text="hover:primary">{{ store.user.name }}</p>
        </RouterLink>
      </li>

      <li v-for="o in menuList" :key="o.title" cursor="pointer">
        <RouterLink :to="{ name: o.routerName }" class="w-full flex items-center">
          <div
            class="icon"
            m="r-4"
            display="flex justify-center items-center"
            position="relative"
            bg="icon-100"
            border="2 dark-500 rounded-1/2"
            w="50px"
            h="50px"
          >
            <div
              v-if="o.routerName === 'ChatWall' && newMsg"
              class="animate__animated animate__bounce"
              bg="red-500"
              border="rounded-1/2"
              w="15px"
              h="15px"
              position="absolute right-0 -top-1"
            ></div>
            <font-awesome-icon :icon="o.icon" size="lg" />
          </div>
          <p font="bold" text="hover:primary">{{ o.title }}</p>
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

  &:hover {
    .icon {
      @apply bg-primary text-white;
    }

    p {
      @apply text-primary;
    }
  }
}
</style>
