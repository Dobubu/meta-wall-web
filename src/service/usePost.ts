import { reactive, ref } from 'vue';
import { useUserStore } from '@/store/user';

import { Post, PostType } from '@/components/post/type';
import { apiGetPostList, apiAddPost, AddPostReq } from '@/plugins/post';
import { dayFormate } from '@/plugins/formate';

export const usePost = () => {
  const list = ref<Post[]>([]);
  const loading = reactive({
    list: false,
    add: false,
  });

  const store = useUserStore();

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

  const addPost = async (payload: Pick<AddPostReq, 'image' | 'content'>) => {
    try {
      loading.add = true;

      const dict = {
        user: store.user._id,
        tags: ['test'],
        type: PostType.PERSON,
        ...payload,
      };

      await apiAddPost(dict);
    } catch (e: any) {
      console.warn(e.message);
    } finally {
      loading.add = false;
    }
  };

  return {
    list,
    loading,
    fetchList,
    addPost,
  };
};
