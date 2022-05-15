import { ref } from 'vue';

import { apiGetUserList } from '@/plugins/user';
import { User } from '@/components/post/type';

export const useUser = () => {
  const list = ref<User[]>([]);

  const fetchList = async () => {
    try {
      const res = await apiGetUserList();
      list.value = res.data;
    } catch (e: any) {
      console.warn(e.message);
    }
  };

  return { list, fetchList };
};
