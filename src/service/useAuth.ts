import { reactive } from 'vue';

import { StorageType } from '@/service/type';
import { SignUpReq, apiSignUp, LoginReq, apiLogin } from '@/api/user';

export const useAuth = () => {
  const loading = reactive({
    auth: false,
  });

  const getToken = () => localStorage.getItem(StorageType.ACCESSTOKEN);

  const getUserId = () => localStorage.getItem(StorageType.USERID);

  const signUp = async (payload: SignUpReq) => {
    try {
      loading.auth = true;
      const res = await apiSignUp(payload);

      localStorage.setItem(StorageType.ACCESSTOKEN, res.data.token);
      localStorage.setItem(StorageType.USERID, res.data.id);

      return res;
    } catch (e) {
      console.error('error: ', e);
      throw e;
    } finally {
      loading.auth = false;
    }
  };

  const login = async (payload: LoginReq) => {
    try {
      loading.auth = true;
      const res = await apiLogin(payload);

      localStorage.setItem(StorageType.ACCESSTOKEN, res.data.token);
      localStorage.setItem(StorageType.USERID, res.data.id);

      return res;
    } catch (e) {
      console.error('error: ', e);
      throw e;
    } finally {
      loading.auth = false;
    }
  };

  return {
    getToken,
    getUserId,
    loading,
    signUp,
    login,
  };
};
