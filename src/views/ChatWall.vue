<script setup lang="ts">
import { onMounted, onUnmounted, nextTick, ref, computed, watch } from 'vue';
import { useElementSize } from '@vueuse/core';
import { storeToRefs } from 'pinia';

import { getMessageList, deleteMessageList } from '@/api/modules/chat';
import { useUserStore } from '@/store/user';
import { useWebSocket } from '@/plugins/ws';
import { WebWSEventType } from '@/plugins/enums';
import { timeFormate } from '@/lib/formate';

import TitleBlock from '@/components/TitleBlock.vue';
import UserMessage from '@/components/chat/UserMessage.vue';

const { user } = storeToRefs(useUserStore());
const wsPlugin = useWebSocket();

const el = ref(null);
const { height } = useElementSize(el);

const msgHeight = computed(() => `${height.value - 60}px`);

const elScroll = ref<HTMLElement>();

const updateScrollView = async () => {
  await nextTick();

  if (!elScroll.value) return;
  elScroll.value.scrollTop = elScroll.value.scrollHeight;
};

const message = ref('');

const addMessage = async () => {
  if (!message.value) return;

  await wsPlugin.send(WebWSEventType.WebAddMessage, message.value);
  message.value = '';
};

const onPress = () => {
  wsPlugin.send(WebWSEventType.WebTyping, `${user.value?.name} is typing`);
};

const messageList = ref<any[]>([]);

const fetchMessageList = async () => {
  const res = await getMessageList();
  messageList.value = res.data.map((o: any) => ({
    ...o,
    createdAt: timeFormate(o.createdAt),
  }));
};

const updateMessageList = (msg2: any) => {
  messageList.value = [
    ...messageList.value,
    {
      ...msg2,
      createdAt: timeFormate(msg2.createdAt),
    },
  ];
};

const clearMessageList = async () => {
  const res = await deleteMessageList();
  messageList.value = res.data;
};

watch(
  () => wsPlugin.newMsg.value,
  async (v) => {
    updateMessageList(v);

    await updateScrollView();
  },
),
  { deep: true };

onMounted(async () => {
  await fetchMessageList();

  wsPlugin.send(WebWSEventType.WebInit, `${user.value?.name} joined the chatroom`);

  await updateScrollView();
});

onUnmounted(() => {
  wsPlugin.send(WebWSEventType.WebUserLeave, `${user.value?.name} left the chatroom 👋`);
});
</script>

<template>
  <TitleBlock
    >聊天大廳

    <button
      v-if="user?.name === 'mischa'"
      class="meta-primary"
      type="button"
      transition="duration-base"
      p="y-1 x-2"
      m="l-10px"
      text="sm"
      border="dark-500 rounded-8px"
      @click="clearMessageList"
    >
      clear
    </button>
  </TitleBlock>

  <div
    v-if="user"
    ref="el"
    class="chat_wall"
    h="6/7"
    m="-t-4"
    p="7"
    display="flex flex-col"
    position="relative"
  >
    <div
      ref="elScroll"
      class="scroll-area chat_wall_wrap"
      p="x-2"
      display="flex-1"
      overflow="y-scroll x-hidden"
    >
      <template v-for="o in messageList" :key="o._id">
        <UserMessage :message="o" />
      </template>
    </div>

    <input
      v-model="message"
      w="full"
      border="0 rounded-8px"
      m="t-3 b-7x"
      type="text"
      placeholder="說一些話..."
      @keyup.enter="addMessage"
      @keyup="onPress"
    />
    <p
      v-show="user.name !== wsPlugin.chatTypingUser.value.name"
      position="absolute bottom-7px"
      text="sm"
    >
      {{ wsPlugin.chatTypingUser.value.content }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.chat_wall {
  background-color: var(--chat-bg);

  &_wrap {
    max-height: v-bind(msgHeight);
  }
}
</style>
