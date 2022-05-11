<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

import { useUserStore } from '@/store/user';

const store = useUserStore();

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
]);
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
        <div
          class="icon"
          :style="{
            'background-image': `url(${store.user.photo})`,
          }"
          bg="icon-100 center cover no-repeat"
          m="r-4"
          border="2 dark-500 rounded-1/2"
          w="50px"
          h="50px"
        ></div>
        <p font="bold" text="hover:primary">{{ store.user.name }}</p>
      </li>

      <li v-for="o in menuList" :key="o.title" cursor="pointer">
        <RouterLink :to="{ name: o.routerName }" class="w-full flex items-center">
          <div
            class="icon"
            m="r-4"
            display="flex justify-center items-center"
            bg="icon-100"
            border="2 dark-500 rounded-1/2"
            w="50px"
            h="50px"
          >
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
