import { reactive, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useUserStore } from '@/store/user';

import { Post, PostType, LikeType } from '@/components/post/type';
import {
  apiGetPost,
  apiGetPostList,
  apiGetUserPostsList,
  apiAddPost,
  AddPostReq,
  apiAddPostLike,
  apiDeletePostLike,
} from '@/plugins/post';
import { dayFormate } from '@/plugins/formate';

export const usePost = () => {
  const list = ref<Post[]>([]);
  const postInfo = ref<Post>();
  const userPostList = ref<Post[]>([]);
  const loading = reactive({
    list: false,
    add: false,
  });

  const store = useUserStore();
  const route = useRoute();
  const router = useRouter();

  const getQueryObject = computed(() => {
    return {
      ...route.query,
    };
  });

  const search = async (query: any, userId = '') => {
    const dict = {
      ...getQueryObject.value,
      ...query,
    };

    await router.push({
      name: route.name as string,
      query: dict,
    });

    if (route.name === 'Post') {
      await fetchList(dict);
    }
    if (route.name === 'UserWall') {
      await fetchUserPostsList(userId, dict);
    }
  };

  const fetchPost = async (postId: string) => {
    try {
      loading.list = true;

      const res = await apiGetPost(postId);
      postInfo.value = { ...res.data, createdAt: dayFormate(res.data.createdAt) };
    } catch (e: any) {
      console.warn(e.message);
    } finally {
      loading.list = false;
    }
  };

  const updatePostLike = (postId: string, type: string) => {
    if (!postInfo.value || !store.user) return;

    if (type === LikeType.ADD) {
      postInfo.value.likes = [store.user._id, ...postInfo.value.likes];
    } else {
      postInfo.value.likes = postInfo.value.likes.filter(o => o !== store.user?._id);
    }
  };

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

  const fetchUserPostsList = async (userId: string, query?: any) => {
    try {
      const res = await apiGetUserPostsList(userId, query);
      userPostList.value = res.data.map((o: Post) => {
        return {
          ...o,
          createdAt: dayFormate(o.createdAt),
        };
      });
    } catch (e: any) {
      console.warn(e.message);
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
    search,
    postInfo,
    fetchPost,
    updatePostLike,
    fetchList,
    userPostList,
    fetchUserPostsList,
    addPost,
    addLike,
    deleteLike,
    updateListLike,
  };
};
