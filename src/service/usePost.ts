import { reactive, ref } from 'vue';
import { useUserStore } from '@/store/user';

import { Post, PostType, LikeType } from '@/components/post/type';
import {
  apiGetPostList,
  apiAddPost,
  AddPostReq,
  apiAddPostLike,
  apiDeletePostLike,
} from '@/plugins/post';
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
      if (!store.user) throw new Error('找不到使用者');

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

  const addLike = async (postId: string) => {
    try {
      await apiAddPostLike(postId);
    } catch (e: any) {
      console.warn(e.message);
    }
  };

  const deleteLike = async (postId: string) => {
    try {
      await apiDeletePostLike(postId);
    } catch (e: any) {
      console.warn(e.message);
    }
  };

  const updateListLike = (postId: string, type: string) => {
    const target = list.value.find(o => o._id === postId);

    if (!target || !store.user) return;

    if (type === LikeType.ADD) {
      target.likes = [store.user._id, ...target.likes];
    } else {
      target.likes = target.likes.filter(o => o !== store.user?._id);
    }
  };

  return {
    list,
    loading,
    fetchList,
    addPost,
    addLike,
    deleteLike,
    updateListLike,
  };
};
