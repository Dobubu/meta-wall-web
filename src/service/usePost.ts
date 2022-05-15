import { reactive, ref } from 'vue';

import { Post } from '@/components/post/type';
import { apiGetPostList } from '@/plugins/post';
import { dayFormate } from '@/plugins/formate';

export const usePost = () => {
  const list = ref<Post[]>([]);
  const loading = reactive({
    list: false,
  });

  const fetchList = async (query = {}) => {
    try {
      loading.list = true;

      const res = await apiGetPostList(query);
      list.value = res.data.map((o: Post) => {
        return {
          ...o,
          createdAt: dayFormate(o.createdAt),
        };
      });
    } catch (e: any) {
      console.warn(e.message);
    } finally {
      loading.list = false;
    }
  };

  return {
    list,
    loading,
    fetchList,
  };
};
