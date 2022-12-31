<script setup lang="ts">
import { onMounted, onUnmounted, nextTick, ref, computed, watch } from 'vue';
import { useUserStore } from '@/store/user';
import { useElementSize } from '@vueuse/core';
import { useWebSocket } from '@/plugins/ws';
import { WebWSEventType } from '@/plugins/enums';
import { useChatroom } from '@/service/useChatroom';

import TitleBlock from '@/components/TitleBlock.vue';
import UserMessage from '@/components/chat/UserMessage.vue';

const store = useUserStore();
const wsPlugin = useWebSocket();
const chatroomService = useChatroom();

const el = ref(null);
const elScroll = ref<HTMLElement>();
const { height } = useElementSize(el);

const msgHeight = computed(() => `${height.value - 60}px`);

const msg = ref('');

const addMsg = async () => {
  if (!msg.value) return;

  await wsPlugin.send(WebWSEventType.WebAddMessage, msg.value);
  msg.value = '';
};
const clearMsg = async () => {
  await chatroomService.clearMessages();
};
const onPress = () => {
  wsPlugin.send(WebWSEventType.WebTyping, `${store.user?.name} is typing`);
};

const list = computed(() => chatroomService.list.value);

const updateScrollView = async () => {
  await nextTick();

  if (!elScroll.value) return;
  elScroll.value.scrollTop = elScroll.value.scrollHeight;
};

watch(
  () => wsPlugin.newMsg.value,
  async v => {
    chatroomService.updateList(v);

    await updateScrollView();
  },
),
  { deep: true };

onMounted(async () => {
  await chatroomService.fetchList();

  wsPlugin.send(WebWSEventType.WebInit, `${store.user?.name} joined the chatroom`);

  await updateScrollView();
});

onUnmounted(() => {
  wsPlugin.send(WebWSEventType.WebUserLeave, `${store.user?.name} left the chatroom 👋`);
});
</script>

<template>
  <TitleBlock
    >聊天大廳

    <button
      v-if="store.user?.name === 'mischa'"
      class="meta-primary"
      type="button"
      transition="duration-base"
      p="y-1 x-2"
      m="l-10px"
      text="sm"
      border="dark-500 rounded-8px"
      @click="clearMsg"
    >
      clear
    </button>
  </TitleBlock>

  <div
    v-if="store.user"
    ref="el"
    class="meta-chat-bg"
    h="6/7"
    m="-t-4"
    p="7"
    display="flex flex-col"
    position="relative"
  >
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
      m="t-3 b-7x"
      type="text"
      placeholder="說一些話..."
      @keyup.enter="addMsg"
      @keyup="onPress"
    />
    <p
      v-show="store.user.name !== wsPlugin.chatTypingUser.value.name"
      position="absolute bottom-7px"
      text="sm"
    >
      {{ wsPlugin.chatTypingUser.value.content }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  max-height: v-bind(msgHeight);
}
</style>
