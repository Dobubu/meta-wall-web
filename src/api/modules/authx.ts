import { LoginReq, apiLogin } from '@/api/instances/user';
import { useAuthStore } from '@/store/auth';
import { handleErrorAsync } from '@/compositions/handleErrorAsync';
import { StorageType } from '@/service/type';

export const login2 = async (payload: LoginReq) => {
  const { updateLoading } = useAuthStore();

  console.log('payload: ', payload);
  updateLoading(true);
  const res = await handleErrorAsync(() => apiLogin(payload));
  localStorage.setItem(StorageType.ACCESSTOKEN, res.data.token);
  localStorage.setItem(StorageType.USERID, res.data.id);
  updateLoading(false);

  console.log('res: 2', res);

  // try {
  //   // loading.auth = true;
  //   const res = await apiLogin(payload);

  //   localStorage.setItem(StorageType.ACCESSTOKEN, res.data.token);
  //   localStorage.setItem(StorageType.USERID, res.data.id);

  //   return res;
  // } catch (e) {
  //   console.error('error: ', e);
  //   throw e;
  // } finally {
  //   // loading.auth = false;
  // }
};
