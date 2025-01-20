import { storeToRefs } from 'pinia';
import type { AxiosResponse } from 'axios';

import {
  apiGetProfile,
  apiUpdateProfile,
  apiUpdatePassword,
  apiUpdateTheme,
  apiGetUserLikeList,
  apiFollowUser,
  apiUnFollowUser,
  apiGetUserFollowingList,
} from '@/api/instances/user';
import { useUserStore } from '@/store/user';
import { handleErrorAsync } from '@/compositions/handleErrorAsync';
import { Post } from '@/components/post/type';
import { dayFormate } from '@/lib/formate';
import { useAuth } from '@/compositions/useAuth';
import { useUser } from '@/compositions/useUser';
import {
  UpdateProfileReq,
  UpdatePasswordReq,
  UpdateThemeReq,
  GetFollowListRes,
} from '@/typings/api/user';
import { LoginRes } from '@/typings/api/auth';

export const fetchProfile = async (userId: string) => {
  const { user, theme } = storeToRefs(useUserStore());
  const { getUserId } = useAuth();
  const { updateThemeStorage } = useUser();

  const res = await handleErrorAsync({
    callback: () => apiGetProfile(userId),
  });

  if (!res.data.photo) {
    res.data.photo = '';
  }

  if (userId === getUserId()) {
    user.value = res.data;

    theme.value = res.data.theme;
    updateThemeStorage(res.data.theme);
  }

  return 'data' in res ? res.data : res;
};

export const updateProfile = async (payload: UpdateProfileReq) => {
  const { updateUserState } = useUserStore();

  const res = await handleErrorAsync({
    callback: () => apiUpdateProfile(payload),
  });

  if (!res.data.photo) {
    res.data.photo = '';
  }

  updateUserState('user', res.data);
  updateUserState('theme', res.data.theme);

  return 'data' in res ? res.data : res;
};

export const updatePassword = async (payload: UpdatePasswordReq) => {
  const { updateUserLoadingState } = useUserStore();
  const { updateToken } = useAuth();

  updateUserLoadingState('password', true);
  const res = await handleErrorAsync({
    callback: () => apiUpdatePassword(payload),
    onSuccess: (successRes: AxiosResponse<LoginRes>) => {
      updateToken(successRes);
      return successRes.data;
    },
    onFinally: () => updateUserLoadingState('password', false),
  });

  return 'data' in res ? res.data : res;
};

export const updateTheme = async (payload: UpdateThemeReq) => {
  const { updateUserState, updateUserLoadingState } = useUserStore();
  const { updateThemeStorage } = useUser();

  updateUserLoadingState('theme', true);

  const handleUpdateThemeOnSuccess = (resPayload: AxiosResponse<any>) => {
    updateUserState('user', resPayload.data);
    updateUserState('theme', resPayload.data.theme);
    updateThemeStorage(resPayload.data.theme);
    return resPayload.data;
  };

  const res = await handleErrorAsync({
    callback: () => apiUpdateTheme(payload),
    onSuccess: (successRes: AxiosResponse<any>) => handleUpdateThemeOnSuccess(successRes),
    onFinally: () => updateUserLoadingState('theme', false),
  });

  return 'data' in res ? res.data : res;
};

export const fetchLikeList = async () => {
  const { updateUserState, updateUserLoadingState } = useUserStore();

  updateUserLoadingState('likeList', true);

  const handleFetchLikeListOnSuccess = (resPayload: AxiosResponse<Post[]>) => {
    let _res;

    _res = resPayload.data.map((o: Post) => {
      return {
        ...o,
        createdAt: dayFormate(o.createdAt),
        user: {
          ...o.user,
          photo: o.user.photo || '',
        },
      };
    });

    updateUserState('likeList', _res);
    return _res;
  };

  const res = await handleErrorAsync({
    callback: () => apiGetUserLikeList(),
    onSuccess: (successRes: AxiosResponse<any>) => handleFetchLikeListOnSuccess(successRes),
    onFinally: () => updateUserLoadingState('likeList', false),
  });

  return 'data' in res ? res.data : res;
};

export const followUser = async (userId: string) => {
  const res = await handleErrorAsync({
    callback: () => apiFollowUser(userId),
  });

  return 'data' in res ? res.data : res;
};

export const unFollowUser = async (userId: string) => {
  const res = await handleErrorAsync({
    callback: () => apiUnFollowUser(userId),
  });

  return 'data' in res ? res.data : res;
};

export const fetchUserFollowingList = async () => {
  const { updateUserState, updateUserLoadingState } = useUserStore();

  updateUserLoadingState('followingList', true);

  const handleFetchUserFollowingList = (resPayload: AxiosResponse<GetFollowListRes[]>) => {
    let _res;

    _res = resPayload.data.map((o: GetFollowListRes) => {
      return {
        ...o,
        createdAt: dayFormate(o.createdAt),
        user: {
          ...o.user,
          photo: o.user.photo || '',
        },
      };
    });

    updateUserState('followList', _res);
    return _res;
  };

  const res = await handleErrorAsync({
    callback: () => apiGetUserFollowingList(),
    onSuccess: (successRes: AxiosResponse<any>) => handleFetchUserFollowingList(successRes),
    onFinally: () => updateUserLoadingState('followingList', false),
  });

  return 'data' in res ? res.data : res;
};
