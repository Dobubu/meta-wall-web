import { ref } from 'vue';

import { apiGetProfile, apiGetUserList } from '@/plugins/user';
import { useUserStore } from '@/store/user';

import { User } from '@/components/post/type';
import DefaultPhoto from '@/assets/images/default_photo.jpg';

export const useUser = () => {
  const list = ref<User[]>([]);
  const user = ref<User | null>(null);

  const store = useUserStore();

  const fetchProfile = async () => {
    const res = await apiGetProfile();

    if (!res.data.photo) {
      res.data.photo = DefaultPhoto;
    }

    store.user = res.data;
  };

  const fetchList = async () => {
    try {
      const res = await apiGetUserList();
      list.value = res.data;
    } catch (e: any) {
      console.warn(e.message);
    }
  };

  return { user, fetchProfile, list, fetchList };
};
