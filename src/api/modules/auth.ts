import type { AxiosResponse } from 'axios';

import { LoginReq, LoginRes, apiLogin, SignUpReq, apiSignUp } from '@/api/instances/auth';
import { useAuthStore } from '@/store/auth';
import { handleErrorAsync } from '@/compositions/handleErrorAsync';

export const postEmailLogin = async (payload: LoginReq, payloadOnSuccess: any) => {
  const { updateLoading } = useAuthStore();

  updateLoading(true);
  await handleErrorAsync({
    callback: () => apiLogin(payload),
    onSuccess: (successRes: AxiosResponse<LoginRes>) => payloadOnSuccess(successRes),
    onFinally: () => updateLoading(false),
  });
};

export const postEmailSignUp = async (payload: SignUpReq, payloadOnSuccess: any) => {
  const { updateLoading } = useAuthStore();

  updateLoading(true);
  await handleErrorAsync({
    callback: () => apiSignUp(payload),
    onSuccess: (successRes: AxiosResponse<LoginRes>) => payloadOnSuccess(successRes),
    onFinally: () => updateLoading(false),
  });
};
