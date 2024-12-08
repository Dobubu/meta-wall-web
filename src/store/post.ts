import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';

import { Post } from '@/components/post/type';

export const usePostStore = defineStore('post', () => {
  const loading = reactive({
    list: false,
    userWallList: false,
    postInfo: false,
    add: false,
    search: false,
    comment: false,
  });

  type LoadingKey = keyof typeof loading;

  const updateLoading = (key: LoadingKey, value: boolean) => (loading[key] = value);

  const postList = ref<Post[]>([]);
  const updatePostList = (data: Post[]) => (postList.value = data);

  const userPostList = ref<Post[]>([]);
  const updateUserPostList = (data: Post[]) => (userPostList.value = data);

  return {
    loading,
    updateLoading,

    postList,
    updatePostList,

    userPostList,
    updateUserPostList,
  };
});
