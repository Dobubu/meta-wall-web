import { createWebHashHistory, createRouter } from 'vue-router';

import { StorageType } from '@/service/type';
import { apiGetProfile } from '@/api/user';

import PostList from '@/views/PostList.vue';
import PostInfo from '@/views/PostInfo.vue';
import CreatePost from '@/views/CreatePost.vue';
import FollowList from '@/views/FollowList.vue';
import LikeList from '@/views/LikeList.vue';
import UserWall from '@/views/UserWall.vue';
import UserEdit from '@/views/UserEdit.vue';
import ChatWall from '@/views/ChatWall.vue';
import MenuLayout from '@/layouts/MenuLayout.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue'),
  },
  {
    path: '/post',
    component: MenuLayout,
    children: [
      {
        path: '',
        name: 'Post',
        component: PostList,
      },
      {
        path: ':id',
        name: 'PostInfo',
        component: PostInfo,
      },
      {
        path: 'create',
        name: 'Create',
        component: CreatePost,
      },
      {
        path: 'follow',
        name: 'Follow',
        component: FollowList,
      },
      {
        path: 'likes',
        name: 'Likes',
        component: LikeList,
      },
      {
        path: 'userWall/:id',
        name: 'UserWall',
        component: UserWall,
      },
      {
        path: 'chatWall',
        name: 'ChatWall',
        component: ChatWall,
      },
    ],
  },
  {
    path: '/user',
    component: MenuLayout,
    children: [
      {
        path: 'edit',
        name: 'Edit',
        component: UserEdit,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const isAuthenticated = async () => {
  try {
    const token = localStorage.getItem(StorageType.ACCESSTOKEN);
    const userId = localStorage.getItem(StorageType.USERID);

    if (!userId || !token) return false;

    const res = await apiGetProfile(userId);
    return !!token && !!res.data;
  } catch (error) {
    return false;
  }
};

router.beforeEach(async (to, from, next) => {
  const isAuth = await isAuthenticated();

  if (to.name !== 'Login' && !isAuth) {
    alert('憑證過期，請重新登入！');
    next({ name: 'Login' });
  } else if (to.name === 'Login' && isAuth) {
    next({ name: 'Post' });
  } else {
    next();
  }
});

export default router;
