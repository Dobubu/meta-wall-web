<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, computed } from 'vue';
import { useUserStore } from '@/store/user';
import { useElementSize } from '@vueuse/core';

import { useWebSocket } from '@/plugins/ws';
import { WebSocketEvent } from '@/plugins/type';
import { useChat } from '@/service/useChat';

import TitleBlock from '@/components/TitleBlock.vue';
import UserMessage from '@/components/chat/UserMessage.vue';

const store = useUserStore();
const wsPlugin = useWebSocket();
const chatService = useChat();

const el = ref<HTMLElement>();
const elScroll = ref<HTMLElement>();

const { height } = useElementSize(el);

const msgHeight = computed(() => `${height.value - 60}px`);
const list = computed(() => chatService.list.value);

const msg = ref('');

const addMsg = () => {
  if (!msg.value) return;

  wsPlugin.eventEmit(WebSocketEvent.CHAT_MESSAGE, {
    name: store.user?.name,
    photo: store.user?.photo,
    content: msg.value,
  });
};

wsPlugin.ws.on(WebSocketEvent.CHAT_MESSAGE, async data => {
  chatService.updateList(data);
  msg.value = '';

  await nextTick();

  if (!elScroll.value) return;
  elScroll.value.scrollTop = elScroll.value.scrollHeight;
});

onMounted(async () => {
  await chatService.fetchMessage();

  wsPlugin.eventEmit(WebSocketEvent.CHAT_INIT, {
    name: store.user?.name,
    photo: store.user?.photo,
    content: 'Hi!',
  });

  await nextTick();

  if (!elScroll.value) return;
  elScroll.value.scrollTop = elScroll.value.scrollHeight;
});

onUnmounted(() => {
  wsPlugin.eventEmit(WebSocketEvent.CHAT_DISCONNECT, {
    name: store.user?.name,
    photo: store.user?.photo,
    content: 'Bye!',
  });
});
</script>

<template>
  <TitleBlock>聊天大廳</TitleBlock>

  <div v-if="store.user" ref="el" h="6/7" m="-t-4" bg="icon-100" p="2" display="flex flex-col">
    <div
      ref="elScroll"
      class="scroll-area wrap"
      p="x-2"
      display="flex-1"
      overflow="y-scroll x-hidden"
    >
      <template v-for="o in list" :key="o._id">
        <UserMessage :msg="o" />
      </template>
    </div>

    <input
      v-model="msg"
      w="full"
      border="0 rounded-8px"
      m="t-3"
      type="text"
      placeholder="說一些話..."
      @keyup.enter="addMsg"
    />
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  max-height: v-bind(msgHeight);
}
</style>
