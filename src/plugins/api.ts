import axios from 'axios';

import { useAuth } from '@/service/useAuth';

const authService = useAuth();

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://protected-reaches-46880.herokuapp.com/'
      : 'http://127.0.0.1:3001',
});

instance.interceptors.request.use(
  config => {
    if (config.headers) {
      config.headers['Authorization'] = `Bearer ${authService.getToken()}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

instance.interceptors.response.use(
  res => {
    return res.data;
  },
  error => Promise.reject(error.response.data),
);

export default instance;
