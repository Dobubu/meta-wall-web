<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '@/store/user';
import { useElementSize } from '@vueuse/core';

import TitleBlock from '@/components/TitleBlock.vue';
import UserMessage from '@/components/chat/UserMessage.vue';
import UsersMessage from '@/components/chat/UsersMessage.vue';

const store = useUserStore();

const el = ref(null);
const { height } = useElementSize(el);

const msgHeight = computed(() => `${height.value - 60}px`);
</script>

<template>
  <TitleBlock>聊天大廳</TitleBlock>

  <div v-if="store.user" ref="el" h="6/7" m="-t-4" bg="icon-100" p="2" display="flex flex-col">
    <div class="scroll-area wrap" p="x-2" display="flex-1" overflow="y-scroll">
      <div v-for="(o, i) in 2" :key="i" display="flex" m="b-8">
        <UsersMessage :photo="store.user.photo" />
      </div>

      <div v-for="(o, i) in 3" :key="i" display="flex flex-row-reverse" m="b-8">
        <UserMessage :photo="store.user.photo" />
      </div>
    </div>

    <input w="full" border="0 rounded-8px" m="t-3" type="text" placeholder="說一些話..." />
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  max-height: v-bind(msgHeight);
}
</style>
