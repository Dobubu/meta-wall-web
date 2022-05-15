import PostAPI from './api';

export const apiGetUserList = async () => PostAPI.get('/users');
