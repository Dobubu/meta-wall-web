import { inject, InjectionKey, Plugin, computed, ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';

import { useUserStore } from '@/store/user';
import { useAuth } from '@/service/useAuth';
import { useLocalhost } from '@/api/api';
import { AppWSEventType, WebWSEventType } from '@/plugins/enums';

const useWebSocketCore = () => {
  const url =
    process.env.NODE_ENV === 'production'
      ? 'https://meta-wall-backend.onrender.com'
      : useLocalhost
      ? 'ws://localhost:3001'
      : 'ws://192.168.168.16:3001';
  const ws = new WebSocket(url);

  const authService = useAuth();
  const store = useUserStore();

  ws.onopen = () => {
    console.log(`%csocket.id = ${ws.url}:connection`, 'background: #1389fd; color: white');
  };

  ws.onclose = () => {
    console.log(`%csocket.id = ${ws.url}:disconnected`, 'background: #00684a; color: white');
  };

  const chatTypingUser = ref<any>({});
  const msgTotal = ref(0);
  const newMsg = ref();
  const onlineTotal = ref(0);

  const debouncedFn = useDebounceFn(() => {
    chatTypingUser.value.content = '';
  }, 1000);

  ws.onmessage = e => {
    let data = JSON.parse(e.data);

    if (data.cmd === AppWSEventType.AppTypingResponse) {
      chatTypingUser.value = data;
      debouncedFn();
    }

    if (
      data.cmd === AppWSEventType.AppAddMessageResponse ||
      data.cmd === AppWSEventType.AppInitResponse ||
      data.cmd === AppWSEventType.AppUserLeaveResponse
    ) {
      newMsg.value = data;
    }

    if (
      data.cmd === AppWSEventType.AppAddMessageResponse ||
      data.cmd === AppWSEventType.AppInitResponse
    ) {
      msgTotal.value += 1;
    }

    if (data.cmd === AppWSEventType.AppOnlineTotalResponse) {
      onlineTotal.value = data.total;
    }
  };

  const defaultPayload = computed(() => ({
    name: store.user?.name,
    photo: store.user?.photo,
    user: authService.getUserId(),
  }));

  const send = async (cmd: WebWSEventType, content: string) => {
    const payload = JSON.stringify({
      ...defaultPayload.value,
      cmd,
      content,
    });

    ws.send(payload);
  };

  return {
    ws,
    chatTypingUser,
    msgTotal,
    onlineTotal,
    newMsg,
    send,
  };
};

type ServiceType = ReturnType<typeof useWebSocketCore>;

export const webSocketServiceSymbol: InjectionKey<ServiceType> = Symbol('webSocketServiceSymbol');

export function useWebSocket(
  injectionKey: string | symbol | InjectionKey<ServiceType> = webSocketServiceSymbol,
) {
  const service = inject(injectionKey);

  if (service) {
    return service as ServiceType;
  }
  throw new Error('web socket plugin not install');
}

const plugin: Plugin = {
  install: (app, options) => {
    const service = useWebSocketCore();
    const key = webSocketServiceSymbol;
    app.provide(key, service);
  },
};

export default plugin;
