import { defineStore } from 'pinia';

import type { User, Post } from '@/components/post/type';
import { GetProfileRes, GetFollowListRes } from '@/typings/api/user';

export const useUserStore = defineStore('user', {
  state: (): {
    [key: string]: any;
    userList: User[];
    likeList: Post[];
    followList: GetFollowListRes[];
    user: GetProfileRes | undefined;
    theme: string;
    loading: {
      password: boolean;
      likeList: boolean;
      followingList: boolean;
      theme: boolean;
    };
  } => {
    return {
      userList: [] as User[],
      likeList: [] as Post[],
      followList: [] as GetFollowListRes[],
      user: undefined as GetProfileRes | undefined,
      theme: 'theme-rilakkuma',
      loading: { password: false, likeList: false, followingList: false, theme: false },
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
  actions: {
    updateUserState(key: string, value: any) {
      this.$state[key] = value;
    },
    updateUserLoadingState(key: LoadingKey, value: boolean) {
      this.$state.loading[key] = value;
    },
  },
});

type LoadingKey = keyof ReturnType<typeof useUserStore>['loading'];
