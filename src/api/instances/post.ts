import type { AxiosResponse } from 'axios';

import PostAPI from '@/api';
import { Post } from '@/components/post/type';
import {
  GetPostListReq,
  AddPostReq,
  GetUserPostListReq,
  AddPostCommentReq,
} from '@/typings/api/post';

export const apiGetPostList = async (payload: GetPostListReq) =>
  PostAPI.get('/posts', { params: payload });

export const apiGetPost = (postId: string): Promise<AxiosResponse<Post>> =>
  PostAPI.get(`/post/${postId}`);

export const apiGetUserPostsList = async (userId: string, payload: GetUserPostListReq) =>
  PostAPI.get(`/posts/user/${userId}`, { params: payload });

export const apiAddPost = async (payload: AddPostReq) => PostAPI.post('/post', payload);

export const apiDeletePost = async (postId: string) => PostAPI.delete(`/post/${postId}`);

export const apiAddPostLike = async (postId: string) => PostAPI.post(`/post/${postId}/like`);

export const apiDeletePostLike = async (postId: string) => PostAPI.delete(`/post/${postId}/like`);

export const apiAddPostComment = async (postId: string, payload: AddPostCommentReq) =>
  PostAPI.post(`/post/${postId}/comment`, payload);
