import type { AxiosResponse } from 'axios';
import router from '@/router';

import { StorageType } from '@/typings/enums';
// import { useWebSocket } from '@/plugins/ws';
import { LoginRes } from '@/typings/api/auth';

export const useAuth = () => {
  const getToken = () => localStorage.getItem(StorageType.ACCESSTOKEN);
  const getUserId = () => localStorage.getItem(StorageType.USERID);

  const updateToken = (res: AxiosResponse<LoginRes>) =>
    localStorage.setItem(StorageType.ACCESSTOKEN, res.data.token);

  const updateTokenAndUserId = (res: AxiosResponse<LoginRes>) => {
    updateToken(res);
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
    updateToken,
    updateTokenAndUserId,
    logout,
  };
};
