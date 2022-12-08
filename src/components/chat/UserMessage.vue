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
  <div
    v-if="msg.role === 'user' && msg.user === store.user?._id"
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

  <div v-if="msg.role === 'user' && msg.user !== store.user?._id" display="flex" m="b-8">
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
