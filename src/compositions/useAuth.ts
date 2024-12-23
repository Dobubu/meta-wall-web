import type { AxiosResponse } from 'axios';
import router from '@/router';

import { StorageType } from '@/service/type';
// import { useWebSocket } from '@/plugins/ws';
import { LoginRes } from '@/api/instances/auth';

export const useAuth = () => {
  const getToken = () => localStorage.getItem(StorageType.ACCESSTOKEN);
  const getUserId = () => localStorage.getItem(StorageType.USERID);

  const updateTokenAndUserId = (res: AxiosResponse<LoginRes>) => {
    localStorage.setItem(StorageType.ACCESSTOKEN, res.data.token);
    localStorage.setItem(StorageType.USERID, res.data.id);
  };

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
    getToken,
    getUserId,
    updateTokenAndUserId,
    logout,
  };
};
