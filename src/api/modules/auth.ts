import type { AxiosResponse } from 'axios';

import { apiLogin, apiSignUp } from '@/api/instances/auth';
import { useAuthStore } from '@/store/auth';
import { handleErrorAsync } from '@/compositions/handleErrorAsync';
import { useAuth } from '@/compositions/useAuth';
import { SignUpReq, LoginReq, LoginRes } from '@/typings/api/auth';

export const postEmailLogin = async (payload: LoginReq) => {
  const { updateLoading } = useAuthStore();
  const { updateTokenAndUserId } = useAuth();

  updateLoading(true);
  await handleErrorAsync({
    callback: () => apiLogin(payload),
    onSuccess: (successRes: AxiosResponse<LoginRes>) => {
      updateTokenAndUserId(successRes);
      return successRes.data;
    },
    onFinally: () => updateLoading(false),
  });
};

export const postEmailSignUp = async (payload: SignUpReq) => {
  const { updateLoading } = useAuthStore();
  const { updateTokenAndUserId } = useAuth();

  updateLoading(true);
  await handleErrorAsync({
    callback: () => apiSignUp(payload),
    onSuccess: (successRes: AxiosResponse<LoginRes>) => {
      updateTokenAndUserId(successRes);
      return successRes.data;
    },
    onFinally: () => updateLoading(false),
  });
};
