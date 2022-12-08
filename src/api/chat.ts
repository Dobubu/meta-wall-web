import PostAPI from './api';

export const apiGetMessageList = async () => PostAPI.get('/chats');
