import { defineStore } from 'pinia';

import type { User } from '@/components/post/type';

export const useUserStore = defineStore('main', {
  state: () => {
    return {
      userList: [] as User[],
    };
  },
  getters: {
    user(state) {
      const i = Math.floor(Math.random() * state.userList.length);
      return state.userList[i];
    },
  },
});
