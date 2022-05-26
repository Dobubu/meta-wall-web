import { defineStore } from 'pinia';

import type { User } from '@/components/post/type';
import { GetProfileRes } from '@/plugins/user';

export const useUserStore = defineStore('main', {
  state: () => {
    return {
      userList: [] as User[],
      user: undefined as GetProfileRes | undefined,
    };
  },
  getters: {
    tmpUser(state) {
      const i = Math.floor(Math.random() * state.userList.length);
      return state.userList[i];
    },
  },
});
