import { createWebHashHistory, createRouter } from 'vue-router';
import PostList from '@/views/PostList.vue';
import PostInfo from '@/views/PostInfo.vue';
import CreatePost from '@/views/CreatePost.vue';
import FollowList from '@/views/FollowList.vue';
import LikeList from '@/views/LikeList.vue';
import UserWall from '@/views/UserWall.vue';
import UserEdit from '@/views/UserEdit.vue';
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

export default router;
