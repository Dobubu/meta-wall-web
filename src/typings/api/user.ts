export enum SexType {
  MALE = 'male',
  FEMALE = 'female',
}

// todo src/components/post/type.ts 有重複的定義
export interface FollowUser {
  _id: string;
  user: string;
  photo: string;
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
