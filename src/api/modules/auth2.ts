import { LoginReq, apiLogin, SignUpReq, apiSignUp } from '@/api/instances/user';
import { useAuthStore } from '@/store/auth';
import { handleErrorAsync } from '@/compositions/handleErrorAsync';
import { StorageType } from '@/service/type';

export const emailLogin = async (payload: LoginReq) => {
  const { updateLoading } = useAuthStore();

  updateLoading(true);
  const res = await handleErrorAsync({
    callback: () => apiLogin(payload),
    onFinally: () => updateLoading(false),
  });
  localStorage.setItem(StorageType.ACCESSTOKEN, res.data.token);
  localStorage.setItem(StorageType.USERID, res.data.id);
};

export const emailSignUp = async (payload: SignUpReq) => {
  const { updateLoading } = useAuthStore();

  updateLoading(true);
  const res = await handleErrorAsync({
    callback: () => apiSignUp(payload),
    onFinally: () => updateLoading(false),
  });
  localStorage.setItem(StorageType.ACCESSTOKEN, res.data.token);
  localStorage.setItem(StorageType.USERID, res.data.id);
};
