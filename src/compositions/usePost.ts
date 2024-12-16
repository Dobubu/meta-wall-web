import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getPost, getPostList, getUserPostsList } from '@/api/modules/post';
import { usePostStore } from '@/store/post';

export const usePost2 = () => {
  const { updateLoading } = usePostStore();

  const route = useRoute();
  const router = useRouter();

  const fetchPost = async (postId: string, onSuccess: any) => {
    const res = await getPost(postId, onSuccess);
    return res;
  };

  const getQueryObject = computed(() => {
    return {
      ...route.query,
    };
  });

  const search = async (query: any, userId = '') => {
    updateLoading('search', true);

    const dict = {
      ...getQueryObject.value,
      ...query,
    };

    await router.push({
      name: route.name as string,
      query: dict,
    });

    if (route.name === 'Post') {
      await getPostList(dict);
    }
    if (route.name === 'UserWall') {
      await getUserPostsList(userId, dict);
    }

    updateLoading('search', false);
  };

  return {
    fetchPost,
    search,
  };
};
