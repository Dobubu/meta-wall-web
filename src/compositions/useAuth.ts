import router from '@/router';

import { StorageType } from '@/service/type';
// import { useWebSocket } from '@/plugins/ws';

export const useAuth = () => {
  // TODO:fix inject ws plugin
  // const wsPlugin = useWebSocket();

  const logout = async () => {
    localStorage.removeItem(StorageType.ACCESSTOKEN);
    localStorage.removeItem(StorageType.USERID);

    // wsPlugin.ws.close();

    router.push({
      name: 'Login',
    });
  };

  return {
    logout,
  };
};
