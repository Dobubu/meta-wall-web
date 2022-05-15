/* eslint-disable no-unused-vars */
export interface Comment {
  name: string;
  photo: string;
  content: string;
  createdAt: string;
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
  likes: number;
  comments: Comment[];
}

export interface User {
  _id: string;
  name: string;
  photo: string;
}
