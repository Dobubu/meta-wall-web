import { inject, InjectionKey, Plugin } from 'vue';

const useWebSocketCore = () => {
  const url =
    process.env.NODE_ENV === 'production'
      ? 'https://meta-wall-backend.onrender.com'
      : 'ws://localhost:3001';
  const ws = new WebSocket(url);

  ws.onopen = () => {
    console.log(`%csocket.id = ${ws.url}:connection`, 'background: #1389fd; color: white');
  };

  return {
    ws,
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
