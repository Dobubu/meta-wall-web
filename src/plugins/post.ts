import PostAPI from './api';

export interface GetPostListReq {
  sort?: string;
  q?: SortType;
}

export enum SortType {
  ASC = 'asc',
  DESC = 'desc',
}

export const apiGetPostList = async (payload: GetPostListReq) =>
  PostAPI.get('/posts', { params: payload });
