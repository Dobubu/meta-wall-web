import PostAPI from './api';

export interface SignUpReq {
  name: string;
  email: string;
  password: string;
}

export type LoginReq = Pick<SignUpReq, 'email' | 'password'>;

export enum SexType {
  MALE = 'male',
  FEMALE = 'female',
}
export interface GetProfileRes {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  photo: string;
  sex: SexType;
}

export const apiSignUp = async (payload: SignUpReq) => PostAPI.post('/user/sign_up', payload);

export const apiLogin = async (payload: LoginReq) => PostAPI.post('/user/sign_in', payload);

export const apiGetProfile = async () => PostAPI.get('/user/profile');

export const apiGetUserList = async () => PostAPI.get('/users');
