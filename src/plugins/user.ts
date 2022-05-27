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
export type UpdateProfileReq = Partial<Pick<GetProfileRes, 'name' | 'photo' | 'sex'>> &
  Pick<GetProfileRes, 'name'>;

export interface UpdatePasswordReq {
  password: string;
  confirmPassword: string;
}

export const apiSignUp = async (payload: SignUpReq) => PostAPI.post('/user/sign_up', payload);

export const apiLogin = async (payload: LoginReq) => PostAPI.post('/user/sign_in', payload);

export const apiGetProfile = async () => PostAPI.get('/user/profile');

export const apiUpdateProfile = async (payload: UpdateProfileReq) =>
  PostAPI.patch('/user/profile', payload);

export const apiUpdatePassword = async (payload: UpdatePasswordReq) =>
  PostAPI.post('/user/updatePassword', payload);

export const apiGetUserList = async () => PostAPI.get('/users');
