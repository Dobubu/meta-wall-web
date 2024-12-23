import type { AxiosResponse } from 'axios';

import PostAPI from '@/api';

export interface SignUpReq {
  name: string;
  email: string;
  password: string;
}

export type LoginReq = Pick<SignUpReq, 'email' | 'password'>;

export interface LoginRes {
  token: string;
  name: string;
  id: string;
}

export const apiSignUp = async (payload: SignUpReq) => PostAPI.post('/user/sign_up', payload);

export const apiLogin = async (payload: LoginReq): Promise<AxiosResponse<LoginRes>> =>
  PostAPI.post('/user/sign_in', payload);
