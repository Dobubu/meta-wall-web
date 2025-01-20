import type { AxiosResponse } from 'axios';

import PostAPI from '@/api';
import { SignUpReq, LoginReq, LoginRes } from '@/typings/api/auth';

export const apiSignUp = async (payload: SignUpReq) => PostAPI.post('/user/sign_up', payload);

export const apiLogin = async (payload: LoginReq): Promise<AxiosResponse<LoginRes>> =>
  PostAPI.post('/user/sign_in', payload);
