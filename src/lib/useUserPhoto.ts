import { computed } from 'vue';

import { useAuth } from '@/service/useAuth';
import { useUserStore } from '@/store/user';

import DefaultUserRilakkuma from '@/assets/images/default_user_rilakkuma.jpeg';
import DefaultUserKorilakkuma from '@/assets/images/default_user_korilakkuma.jpeg';
import DefaultUserChairoikoguma from '@/assets/images/default_user_chairoikoguma.jpeg';
import DefaultUserConversation from '@/assets/images/default_user_conversation.png';
import DefaultPhotoUsers from '@/assets/images/default_users.jpeg';

export const useUserPhoto = () => {
  const store = useUserStore();
  const authService = useAuth();

  const defaultPhotoUser = computed(() => {
    if (store.theme === 'theme-rilakkuma') {
      return DefaultUserRilakkuma;
    }
    if (store.theme === 'theme-korilakkuma') {
      return DefaultUserKorilakkuma;
    }
    if (store.theme === 'theme-chairoikoguma') {
      return DefaultUserChairoikoguma;
    }
    if (store.theme === 'theme-conversation') {
      return DefaultUserConversation;
    }
    return DefaultUserRilakkuma;
  });

  const getUserPhoto = computed(() => store.user?.photo || defaultPhotoUser.value);

  const getUsersPhoto = (userId: string, photo: string) => {
    if (photo) {
      return photo;
    } else {
      if (authService.getUserId() === userId) {
        return getUserPhoto.value;
      }
      return DefaultPhotoUsers;
    }
  };

  return {
    getUserPhoto,
    getUsersPhoto,
  };
};
