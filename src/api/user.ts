import PostAPI from './api';

import { FollowUser } from '@/components/post/type';

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
  followers: FollowUser[];
  following: FollowUser[];
  theme: string;
}
export type UpdateProfileReq = Partial<Pick<GetProfileRes, 'name' | 'photo' | 'sex'>> &
  Pick<GetProfileRes, 'name'>;

export type UpdateThemeReq = Pick<GetProfileRes, 'theme'>;

export interface UpdatePasswordReq {
  password: string;
  confirmPassword: string;
}

export interface GetFollowListRes {
  user: {
    _id: string;
    name: string;
    photo: string;
  };
  _id: string;
  createdAt: string;
}

export const apiSignUp = async (payload: SignUpReq) => PostAPI.post('/user/sign_up', payload);

export const apiLogin = async (payload: LoginReq) => PostAPI.post('/user/sign_in', payload);

export const apiGetProfile = async (userId: string) => PostAPI.get(`/user/profile/${userId}`);

export const apiUpdateProfile = async (payload: UpdateProfileReq) =>
  PostAPI.patch('/user/profile', payload);

export const apiUpdatePassword = async (payload: UpdatePasswordReq) =>
  PostAPI.post('/user/updatePassword', payload);

export const apiUpdateTheme = async (payload: UpdateThemeReq) =>
  PostAPI.patch('/user/theme', payload);

export const apiGetUserList = async () => PostAPI.get('/users');

export const apiGetUserLikeList = async () => PostAPI.get('/user/likes/list');

export const apiFollowUser = async (userId: string) => PostAPI.post(`/user/${userId}/follow`);

export const apiUnFollowUser = async (userId: string) => PostAPI.delete(`/user/${userId}/follow`);

export const apiGetUserFollowingList = async () => PostAPI.get('/user/following/list');
