import { storeToRefs } from 'pinia';
import type { AxiosResponse } from 'axios';

import {
  apiGetPost,
  apiGetPostList,
  apiGetUserPostsList,
  apiAddPost,
  apiDeletePost,
  apiAddPostLike,
  apiDeletePostLike,
  apiAddPostComment,
} from '@/api/instances/post';
import { usePostStore } from '@/store/post';
import { useUserStore } from '@/store/user';
import { handleErrorAsync } from '@/compositions/handleErrorAsync';
import { Post, PostType } from '@/components/post/type';
import { dayFormate } from '@/lib/formate';
import { AddPostReq, AddPostCommentReq } from '@/typings/api/post';

export const getPost = async (postId: string, payloadOnSuccess: any) => {
  const { updateLoading } = usePostStore();

  updateLoading('postInfo', true);
  const res = await handleErrorAsync<Post>({
    callback: () => apiGetPost(postId),
    onSuccess: (successRes: AxiosResponse<Post>) => payloadOnSuccess(successRes),
    onFinally: () => updateLoading('postInfo', false),
  });

  return 'data' in res ? res.data : res;
};

export const getPostList = async (query = {}) => {
  const { updateLoading, updatePostList } = usePostStore();

  updateLoading('list', true);

  const handleUpdatePostList = (resPayload: AxiosResponse<Post[]>) => {
    let _res;

    _res = resPayload.data.map((o: Post) => {
      return {
        ...o,
        createdAt: dayFormate(o.createdAt),
        user: {
          ...o.user,
          photo: o.user.photo || '',
        },
        comments: o.comments.map((o2) => {
          let dict = {
            ...o2,
            createdAt: dayFormate(o2.createdAt),
          };

          dict.user.photo = o2.user.photo || '';

          return dict;
        }),
      };
    });

    updatePostList(_res);
    return _res;
  };

  const res = await handleErrorAsync({
    callback: () => apiGetPostList(query),
    onSuccess: (successRes: AxiosResponse<Post[]>) => handleUpdatePostList(successRes),
    onFinally: () => updateLoading('list', false),
  });
  return 'data' in res ? res.data : res;
};

export const getUserPostsList = async (userId: string, query?: any) => {
  const { updateLoading, updateUserPostList } = usePostStore();

  updateLoading('userWallList', true);

  const handleUpdateUserPostList = (resPayload: AxiosResponse<Post[]>) => {
    let _res;

    _res = resPayload.data.map((o: Post) => {
      return {
        ...o,
        createdAt: dayFormate(o.createdAt),
        user: {
          ...o.user,
          photo: o.user.photo || '',
        },
        comments: o.comments.map((o2) => {
          let dict = {
            ...o2,
            createdAt: dayFormate(o2.createdAt),
          };

          dict.user.photo = o2.user.photo || '';

          return dict;
        }),
      };
    });

    updateUserPostList(_res);
    return _res;
  };

  const res = await handleErrorAsync({
    callback: () => apiGetUserPostsList(userId, query),
    onSuccess: (successRes: AxiosResponse<Post[]>) => handleUpdateUserPostList(successRes),
    onFinally: () => updateLoading('userWallList', false),
  });
  return 'data' in res ? res.data : res;
};

export const addPost = async (payload: Pick<AddPostReq, 'image' | 'content'>) => {
  const { user } = storeToRefs(useUserStore());

  const { updateLoading } = usePostStore();

  if (!user.value) throw new Error('找不到使用者');

  updateLoading('add', true);

  const dict = {
    user: user.value._id,
    tags: ['test'],
    type: PostType.PERSON,
    ...payload,
  };

  const res = await handleErrorAsync({
    callback: () => apiAddPost(dict),
    onFinally: () => updateLoading('add', false),
  });
  return res;
};

export const deletePost = async (postId: string) => {
  const res = await handleErrorAsync({
    callback: () => apiDeletePost(postId),
  });
  return res;
};

export const addPostLike = async (postId: string) => {
  const res = await handleErrorAsync({
    callback: () => apiAddPostLike(postId),
  });
  return res;
};

export const deletePostLike = async (postId: string) => {
  const res = await handleErrorAsync({
    callback: () => apiDeletePostLike(postId),
  });
  return res;
};

export const addPostComment = async (postId: string, payload: AddPostCommentReq) => {
  const { updateLoading } = usePostStore();

  updateLoading('comment', true);
  const res = await handleErrorAsync({
    callback: () => apiAddPostComment(postId, payload),
    onFinally: () => updateLoading('comment', false),
  });
  return res;
};
