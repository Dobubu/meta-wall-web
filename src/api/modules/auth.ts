import type { AxiosResponse } from 'axios';

import { LoginReq, LoginRes, apiLogin, SignUpReq, apiSignUp } from '@/api/instances/auth';
import { useAuthStore } from '@/store/auth';
import { handleErrorAsync } from '@/compositions/handleErrorAsync';
import { useAuth } from '@/compositions/useAuth';

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
