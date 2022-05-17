import { createWebHashHistory, createRouter } from 'vue-router';
import PostList from '@/views/PostList.vue';
import CreatePost from '@/views/CreatePost.vue';
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
        path: 'create',
        name: 'Create',
        component: CreatePost,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;