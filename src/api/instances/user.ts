import PostAPI from '@/api';

import { UpdateProfileReq, UpdatePasswordReq, UpdateThemeReq } from '@/typings/api/user';

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
