<script setup lang="ts">
import { ref } from 'vue';

const menuList = ref([
  {
    title: '追蹤名單',
    icon: ['far', 'bell'],
  },
  {
    title: '我按讚的文章',
    icon: ['far', 'thumbs-up'],
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

    <ul w="full">
      <li cursor="pointer" display="flex items-center">
        <div
          class="icon"
          :style="{
            'background-image':
              'url(https://i.picsum.photos/id/443/200/200.jpg?hmac=ceI_qNYuyS_i8MicdRztsYDJLek0_-IDsEwLhAfaIEo)',
          }"
          bg="icon-100 center cover no-repeat"
          m="r-4"
          border="2 dark-500 rounded-1/2"
          w="50px"
          h="50px"
        ></div>
        <p font="bold" text="hover:primary">Member</p>
      </li>

      <li v-for="o in menuList" :key="o.title" cursor="pointer" display="flex items-center">
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
