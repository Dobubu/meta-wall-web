import { inject, InjectionKey, Plugin } from 'vue';
import { io } from 'socket.io-client';

import { useAuth } from '@/service/useAuth';
import { WebSocketEvent } from './type';

const authService = useAuth();

const useWebSocketCore = () => {
  const url =
    process.env.NODE_ENV === 'production'
      ? 'https://protected-reaches-46880.herokuapp.com/'
      : 'http://127.0.0.1:3001';
  const ws = io(url);

  ws.on('connect', () => {
    // eslint-disable-next-line no-console
    console.log(`%csocket.id = ${ws.id}`, 'background: #fff; color: red');
  });

  const eventEmit = (event: WebSocketEvent, payload: any) => {
    ws.emit(event, {
      user: authService.getUserId(),
      ...payload,
    });
  };

  return {
    ws,
    eventEmit,
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
