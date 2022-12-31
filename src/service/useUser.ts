import { reactive, ref } from 'vue';

import {
  apiGetProfile,
  apiGetUserList,
  UpdateProfileReq,
  apiUpdateProfile,
  UpdatePasswordReq,
  apiUpdatePassword,
  UpdateThemeReq,
  apiUpdateTheme,
  apiGetUserLikeList,
  apiFollowUser,
  apiUnFollowUser,
  apiGetUserFollowingList,
  GetFollowListRes,
} from '@/api/user';
import { dayFormate } from '@/lib/formate';
import { useUserStore } from '@/store/user';
import { StorageType } from '@/service/type';
import { useAuth } from '@/service/useAuth';

import { User, Post } from '@/components/post/type';

export const useUser = () => {
  const list = ref<User[]>([]);
  const likeList = ref<Post[]>([]);
  const followList = ref<GetFollowListRes[]>([]);
  const user = ref<User | null>(null);
  const loading = reactive({
    password: false,
    likeList: false,
    followingList: false,
    theme: false,
  });

  const store = useUserStore();
  const authService = useAuth();

  const fetchProfile = async (userId: string) => {
    const res = await apiGetProfile(userId);

    if (!res.data.photo) {
      res.data.photo = '';
    }

    if (userId === authService.getUserId()) {
      store.user = res.data;

      store.theme = res.data.theme;
      localStorage.setItem(StorageType.THEME, res.data.theme);
    }

    return res.data;
  };

  const updateProfile = async (payload: UpdateProfileReq) => {
    try {
      const res = await apiUpdateProfile(payload);

      if (!res.data.photo) {
        res.data.photo = '';
      }

      store.user = res.data;
      store.theme = res.data.theme;
    } catch (e) {
      console.error('error: ', e);
      throw e;
    }
  };

  const updatePassword = async (payload: UpdatePasswordReq) => {
    try {
      loading.password = true;

      const res = await apiUpdatePassword(payload);
      localStorage.setItem(StorageType.ACCESSTOKEN, res.data.token);
    } catch (e) {
      console.error('error: ', e);
      throw e;
    } finally {
      loading.password = false;
    }
  };

  const updateTheme = async (payload: UpdateThemeReq) => {
    try {
      loading.theme = true;

      const res = await apiUpdateTheme(payload);

      store.user = res.data;

      store.theme = res.data.theme;
      localStorage.setItem(StorageType.THEME, res.data.theme);
    } catch (e) {
      console.error('error: ', e);
      throw e;
    } finally {
      loading.theme = false;
    }
  };

  const fetchList = async () => {
    try {
      const res = await apiGetUserList();
      list.value = res.data;
    } catch (e: any) {
      console.warn(e.message);
    }
  };

  const fetchLikeList = async () => {
    try {
      loading.likeList = true;

      const res = await apiGetUserLikeList();

      likeList.value = res.data.map((o: Post) => {
        return {
          ...o,
          createdAt: dayFormate(o.createdAt),
          user: {
            ...o.user,
            photo: o.user.photo || '',
          },
        };
      });
    } catch (e: any) {
      console.warn(e.message);
    } finally {
      loading.likeList = false;
    }
  };

  const updateLikeList = (postId: string) => {
    likeList.value = likeList.value.filter(o => o._id !== postId);
  };

  const followUser = async (userId: string) => {
    try {
      await apiFollowUser(userId);
    } catch (e: any) {
      console.warn(e.message);
    }
  };

  const unFollowUser = async (userId: string) => {
    try {
      await apiUnFollowUser(userId);
    } catch (e: any) {
      console.warn(e.message);
    }
  };

  const fetchUserFollowingList = async () => {
    try {
      loading.followingList = true;

      const res = await apiGetUserFollowingList();

      followList.value = res.data.map((o: GetFollowListRes) => {
        return {
          ...o,
          createdAt: dayFormate(o.createdAt),
          user: {
            ...o.user,
            photo: o.user.photo || '',
          },
        };
      });
    } catch (e: any) {
      console.warn(e.message);
    } finally {
      loading.followingList = false;
    }
  };

  return {
    loading,
    user,
    fetchProfile,
    list,
    fetchList,
    likeList,
    fetchLikeList,
    updateLikeList,
    updateProfile,
    updatePassword,
    updateTheme,
    followUser,
    unFollowUser,
    fetchUserFollowingList,
    followList,
  };
};
