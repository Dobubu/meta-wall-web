import { reactive, ref } from 'vue';

import {
  apiGetProfile,
  apiGetUserList,
  UpdateProfileReq,
  apiUpdateProfile,
  UpdatePasswordReq,
  apiUpdatePassword,
  apiGetUserLikeList,
} from '@/plugins/user';
import { dayFormate } from '@/plugins/formate';
import { useUserStore } from '@/store/user';
import { StorageType } from '@/service/type';

import { User, Post } from '@/components/post/type';
import DefaultPhoto from '@/assets/images/default_photo.jpg';

export const useUser = () => {
  const list = ref<User[]>([]);
  const likeList = ref<Post[]>([]);
  const user = ref<User | null>(null);
  const loading = reactive({
    password: false,
  });

  const store = useUserStore();

  const fetchProfile = async () => {
    const res = await apiGetProfile();

    if (!res.data.photo) {
      res.data.photo = DefaultPhoto;
    }

    store.user = res.data;
  };

  const updateProfile = async (payload: UpdateProfileReq) => {
    try {
      const res = await apiUpdateProfile(payload);

      if (!res.data.photo) {
        res.data.photo = DefaultPhoto;
      }

      store.user = res.data;
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
      const res = await apiGetUserLikeList();
      likeList.value = res.data.map((o: Post) => {
        return {
          ...o,
          createdAt: dayFormate(o.createdAt),
        };
      });
    } catch (e: any) {
      console.warn(e.message);
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
    updateProfile,
    updatePassword,
  };
};
