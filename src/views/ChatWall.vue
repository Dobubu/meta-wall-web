<script setup lang="ts">
import { onMounted, onUnmounted, nextTick, ref, computed } from 'vue';
import { useUserStore } from '@/store/user';
import { useElementSize, useDebounceFn } from '@vueuse/core';
import { useWebSocket } from '@/plugins/ws';
import { WebWSEventType, AppWSEventType } from '@/plugins/enums';
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
const typing = ref<any>({});

const addMsg = () => {
  if (!msg.value) return;

  wsPlugin.send(WebWSEventType.WebAddMessage, msg.value);
};

const onPress = () => {
  wsPlugin.sendTyping(WebWSEventType.WebTyping);
};

const list = computed(() => chatroomService.list.value);

const debouncedFn = useDebounceFn(() => {
  typing.value.content = '';
}, 1000);

onMounted(async () => {
  await chatroomService.fetchList();

  wsPlugin.sendInit(WebWSEventType.WebInit);

  await nextTick();
  if (!elScroll.value) return;
  elScroll.value.scrollTop = elScroll.value.scrollHeight;

  wsPlugin.ws.onmessage = async event => {
    let data = JSON.parse(event.data);

    if (data.cmd === AppWSEventType.AppTypingResponse) {
      typing.value = data;
      debouncedFn();
    }

    if (data.cmd === AppWSEventType.AppAddMessageResponse) {
      chatroomService.updateList(data);
      msg.value = '';

      await nextTick();

      if (!elScroll.value) return;
      elScroll.value.scrollTop = elScroll.value.scrollHeight;
    }

    if (
      data.cmd === AppWSEventType.AppInitResponse ||
      data.cmd === AppWSEventType.AppUserLeaveResponse
    ) {
      chatroomService.updateList(data);

      await nextTick();

      if (!elScroll.value) return;
      elScroll.value.scrollTop = elScroll.value.scrollHeight;
    }

    console.log('data: ', data);
  };
});

onUnmounted(() => {
  wsPlugin.sendLeave(WebWSEventType.WebUserLeave);
});
</script>

<template>
  <TitleBlock>聊天大廳</TitleBlock>

  <div
    v-if="store.user"
    ref="el"
    h="6/7"
    m="-t-4"
    bg="icon-100"
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
    <p v-show="store.user.name !== typing.name" position="absolute bottom-7px" text="sm">
      {{ typing?.content }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  max-height: v-bind(msgHeight);
}
</style>
