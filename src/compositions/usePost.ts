import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getPostList, getUserPostsList } from '@/api/modules/post';
import { usePostStore } from '@/store/post';

export const usePost = () => {
  const { updateLoading } = usePostStore();

  const route = useRoute();
  const router = useRouter();

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
    getQueryObject,
    search,
  };
};
