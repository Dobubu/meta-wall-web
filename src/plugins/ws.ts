import { inject, InjectionKey, Plugin, computed, ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';

import { useLocalhost, getApiUrl, getApiNetworkUrl } from '@/api';
import { useUserStore } from '@/store/user';
import { useAuth } from '@/compositions/useAuth';
import { AppWSEventType, WebWSEventType } from '@/typings/enums';

const useWebSocketCore = () => {
  const url =
    process.env.NODE_ENV === 'production'
      ? getApiUrl('ws')
      : useLocalhost
      ? getApiUrl('ws')
      : getApiNetworkUrl('ws');
  const ws = new WebSocket(url);

  const { getUserId } = useAuth();
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

  ws.onmessage = (e) => {
    let data = JSON.parse(e.data);

    if (data.cmd === AppWSEventType.APP_TYPING_RESPONSE) {
      chatTypingUser.value = data;
      debouncedFn();
    }

    if (
      data.cmd === AppWSEventType.APP_ADD_MESSAGE_RESPONSE ||
      data.cmd === AppWSEventType.APP_INIT_RESPONSE ||
      data.cmd === AppWSEventType.APP_USER_LEAVE_RESPONSE
    ) {
      newMsg.value = data;
    }

    if (
      data.cmd === AppWSEventType.APP_ADD_MESSAGE_RESPONSE ||
      data.cmd === AppWSEventType.APP_INIT_RESPONSE
    ) {
      msgTotal.value += 1;
    }

    if (data.cmd === AppWSEventType.APP_ONLINE_TOTAL_RESPONSE) {
      onlineTotal.value = data.total;
    }
  };

  const defaultPayload = computed(() => ({
    name: store.user?.name,
    photo: store.user?.photo,
    user: getUserId(),
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
