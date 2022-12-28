import { defineStore } from 'pinia';

import type { User } from '@/components/post/type';
import { GetProfileRes } from '@/api/user';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userList: [] as User[],
      user: undefined as GetProfileRes | undefined,
      theme: '',
    };
  },
  getters: {
    tmpUser(state) {
      const i = Math.floor(Math.random() * state.userList.length);
      return state.userList[i];
    },
    userTheme(state) {
      return state.theme;
    },
  },
});
