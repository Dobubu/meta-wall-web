import { reactive, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useUserStore } from '@/store/user';

import { Post, PostType, LikeType, Comment } from '@/components/post/type';
import {
  apiGetPost,
  apiGetPostList,
  apiGetUserPostsList,
  apiAddPost,
  AddPostReq,
  apiDeletePost,
  apiAddPostLike,
  apiDeletePostLike,
  AddPostComment,
  apiAddPostComment,
} from '@/plugins/post';
import { dayFormate } from '@/plugins/formate';
import { useAuth } from '@/service/useAuth';

import DefaultPhotoUser from '@/assets/images/default_user.jpg';
import DefaultPhotoUsers from '@/assets/images/default_users.jpg';

export const usePost = () => {
  const list = ref<Post[]>([]);
  const postInfo = ref<Post>();
  const userPostList = ref<Post[]>([]);
  const loading = reactive({
    list: false,
    add: false,
    search: false,
    comment: false,
  });

  const store = useUserStore();
  const route = useRoute();
  const router = useRouter();
  const authService = useAuth();

  const getQueryObject = computed(() => {
    return {
      ...route.query,
    };
  });

  const search = async (query: any, userId = '') => {
    loading.search = true;

    const dict = {
      ...getQueryObject.value,
      ...query,
    };

    await router.push({
      name: route.name as string,
      query: dict,
    });

    if (route.name === 'Post') {
      await fetchList(dict);
    }
    if (route.name === 'UserWall') {
      await fetchUserPostsList(userId, dict);
    }

    loading.search = false;
  };

  const fetchPost = async (postId: string) => {
    try {
      loading.list = true;

      const res = await apiGetPost(postId);

      postInfo.value = {
        ...res.data,
        createdAt: dayFormate(res.data.createdAt),
        user: {
          ...res.data.user,
          photo: res.data.user.photo
            ? res.data.user.photo
            : authService.getUserId() === res.data.user._id
            ? DefaultPhotoUser
            : DefaultPhotoUsers,
        },
        comments: res.data.comments.map((o: Comment) => {
          let dict = {
            ...o,
            createdAt: dayFormate(o.createdAt),
          };

          const photo = o.user.photo
            ? o.user.photo
            : authService.getUserId() === o.user._id
            ? DefaultPhotoUser
            : DefaultPhotoUsers;

          dict.user.photo = photo;

          return dict;
        }),
      };
    } catch (e: any) {
      console.warn(e.message);
    } finally {
      loading.list = false;
    }
  };

  const updatePostLike = (postId: string, type: string) => {
    if (!postInfo.value || !store.user) return;

    if (type === LikeType.ADD) {
      postInfo.value.likes = [store.user._id, ...postInfo.value.likes];
    } else {
      postInfo.value.likes = postInfo.value.likes.filter(o => o !== store.user?._id);
    }
  };

  const fetchList = async (query = {}) => {
    try {
      loading.list = true;

      const res = await apiGetPostList(query);

      list.value = res.data.map((o: Post) => {
        return {
          ...o,
          createdAt: dayFormate(o.createdAt),
          user: {
            ...o.user,
            photo: o.user.photo
              ? o.user.photo
              : authService.getUserId() === o.user._id
              ? DefaultPhotoUser
              : DefaultPhotoUsers,
          },
          comments: o.comments.map(o2 => {
            let dict = {
              ...o2,
              createdAt: dayFormate(o2.createdAt),
            };

            const photo = o2.user.photo
              ? o2.user.photo
              : authService.getUserId() === o2.user._id
              ? DefaultPhotoUser
              : DefaultPhotoUsers;

            dict.user.photo = photo;

            return dict;
          }),
        };
      });
    } catch (e: any) {
      console.warn(e.message);
    } finally {
      loading.list = false;
    }
  };

  const fetchUserPostsList = async (userId: string, query?: any) => {
    try {
      const res = await apiGetUserPostsList(userId, query);
      const photo = authService.getUserId() === userId ? DefaultPhotoUser : DefaultPhotoUsers;

      userPostList.value = res.data.map((o: Post) => {
        return {
          ...o,
          createdAt: dayFormate(o.createdAt),
          user: { ...o.user, photo: o.user.photo || photo },
          comments: o.comments.map(o2 => {
            let dict = {
              ...o2,
              createdAt: dayFormate(o2.createdAt),
            };

            const photo2 = o2.user.photo
              ? o2.user.photo
              : authService.getUserId() === o2.user._id
              ? DefaultPhotoUser
              : DefaultPhotoUsers;

            dict.user.photo = photo2;

            return dict;
          }),
        };
      });
    } catch (e: any) {
      console.warn(e.message);
    }
  };

  const addPost = async (payload: Pick<AddPostReq, 'image' | 'content'>) => {
    try {
      if (!store.user) throw new Error('找不到使用者');

      loading.add = true;

      const dict = {
        user: store.user._id,
        tags: ['test'],
        type: PostType.PERSON,
        ...payload,
      };

      await apiAddPost(dict);
    } catch (e: any) {
      console.warn(e.message);
    } finally {
      loading.add = false;
    }
  };

  const deletePost = async (postId: string) => {
    try {
      await apiDeletePost(postId);
    } catch (e: any) {
      console.warn(e.message);
    }
  };

  const addLike = async (postId: string) => {
    try {
      await apiAddPostLike(postId);
    } catch (e: any) {
      console.warn(e.message);
    }
  };

  const deleteLike = async (postId: string) => {
    try {
      await apiDeletePostLike(postId);
    } catch (e: any) {
      console.warn(e.message);
    }
  };

  const updateListLike = (postId: string, type: string) => {
    const target = list.value.find(o => o._id === postId);

    if (!target || !store.user) return;

    if (type === LikeType.ADD) {
      target.likes = [store.user._id, ...target.likes];
    } else {
      target.likes = target.likes.filter(o => o !== store.user?._id);
    }
  };

  const addPostComment = async (postId: string, payload: AddPostComment) => {
    try {
      loading.comment = true;

      await apiAddPostComment(postId, payload);
    } catch (e: any) {
      console.warn(e.message);
    } finally {
      loading.comment = false;
    }
  };

  return {
    list,
    loading,
    search,
    postInfo,
    fetchPost,
    updatePostLike,
    fetchList,
    userPostList,
    fetchUserPostsList,
    addPost,
    deletePost,
    addLike,
    deleteLike,
    updateListLike,
    addPostComment,
  };
};
