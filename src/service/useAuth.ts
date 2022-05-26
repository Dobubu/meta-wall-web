import { reactive } from 'vue';

import { StorageType } from '@/service/type';
import { SignUpReq, apiSignUp, LoginReq, apiLogin } from '@/plugins/user';

export const useAuth = () => {
  const loading = reactive({
    auth: false,
  });

  const getToken = () => localStorage.getItem(StorageType.ACCESSTOKEN);

  const signUp = async (payload: SignUpReq) => {
    try {
      loading.auth = true;
      const res = await apiSignUp(payload);
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
    loading,
    signUp,
    login,
  };
};
