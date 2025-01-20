import { useUserStore } from '@/store/user';
import { StorageType } from '@/typings/enums';
import { storeToRefs } from 'pinia';

export const useUser = () => {
  const { updateUserState } = useUserStore();
  const { likeList } = storeToRefs(useUserStore());

  const updateThemeStorage = (theme: string) => localStorage.setItem(StorageType.THEME, theme);

  const updateLikeList = (postId: string) => {
    const _likeList = likeList.value.filter((o) => o._id !== postId);
    updateUserState('likeList', _likeList);
  };

  return {
    updateThemeStorage,
    updateLikeList,
  };
};
