import PostAPI from './api';

export const apiGetMessageList = async () => PostAPI.get('/chats');

export const apiDeleteMessageList = async () => PostAPI.delete('/chats');
