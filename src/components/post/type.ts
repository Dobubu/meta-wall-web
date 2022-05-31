/* eslint-disable no-unused-vars */
export interface Comment {
  _id: string;
  comment: string;
  createdAt: string;
  post: string;
  user: {
    _id: string;
    name: string;
    photo: string;
    createdAt: string;
  };
}

export enum PostType {
  PERSON = 'person',
  GROUP = 'group',
}

export interface Post {
  _id: string;
  user: User;
  tags: string[];
  type: PostType;
  image: string;
  photo: string;
  createdAt: string;
  content: string;
  likes: string[];
  comments: Comment[];
}

export interface User {
  _id: string;
  name: string;
  photo: string;
}

export enum LikeType {
  ADD = 'add',
  DELETE = 'delete',
}
