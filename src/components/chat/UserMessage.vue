<script setup lang="ts">
import { PropType } from 'vue';

import { useUserStore } from '@/store/user';

import UserItem from '@/components/UserItem.vue';

defineProps({
  msg: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
});

const store = useUserStore();
</script>

<template>
  <div v-if="msg.role === 'system'" w="full" text="center">
    <p bg="msg-400" display="inline-block" border="rounded-3xl" p="2" m="y-1 r-1" text="white sm">
      {{ msg.content }}
    </p>
    <p text="msg-300 sm" display="inline-block">{{ msg.createdAt }}</p>
  </div>

  <div
    v-if="msg.role === 'user' && msg.user === store.user?._id"
    class="animate__animated animate__fadeInRight animate__faster"
    display="flex flex-row-reverse"
    m="b-8"
  >
    <UserItem :photo="msg.photo" display="flex-none self-end" m="l-2" margin="0" />
    <div>
      <div display="flex items-center">
        <p text="msg-300 right" m="t-2 mr-2">{{ msg.createdAt }}</p>
        <div
          bg="msg-200"
          w="5/6"
          border="rounded-t-3xl rounded-l-3xl"
          p="3"
          m="l-auto"
          text="white"
        >
          {{ msg.content }}
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="msg.role === 'user' && msg.user !== store.user?._id"
    class="animate__animated animate__fadeInLeft animate__faster"
    display="flex"
    m="b-8"
  >
    <UserItem :photo="msg.photo" display="flex-none self-end" margin="0.5rem" />
    <div>
      <p text="dark-500 sm">{{ msg.name }}</p>

      <div display="flex items-center">
        <div bg="msg-100" w="5/6" border="rounded-r-3xl rounded-t-3xl" p="3">
          {{ msg.content }}
        </div>
        <p text="msg-300 right" m="t-2 mr-2">{{ msg.createdAt }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
