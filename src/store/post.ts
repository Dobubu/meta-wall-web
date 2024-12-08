import { reactive } from 'vue';
import { defineStore } from 'pinia';

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

  return {
    loading,
    updateLoading,
  };
});
