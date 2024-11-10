import axios from 'axios';

import { useAuth } from '@/service/useAuth';

export const useLocalhost = import.meta.env.VITE_USE_LOCALHOST === 'true';

export const getApiUrl = (state = 'http') => {
  if (state === 'ws') {
    if (process.env.NODE_ENV === 'production') {
      return `wss${import.meta.env.VITE_API_URL}`;
    }
    return 'ws://localhost:3001';
  } else {
    return `http${import.meta.env.VITE_API_URL}`;
  }
};

export const getApiNetworkUrl = (state = 'http') =>
  state === 'ws'
    ? `ws${import.meta.env.VITE_API_NETWORK_URL}`
    : `http${import.meta.env.VITE_API_NETWORK_URL}`;

const authService = useAuth();

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? getApiUrl()
      : useLocalhost
      ? getApiUrl()
      : getApiNetworkUrl(),
});

instance.interceptors.request.use(
  (config) => {
    if (config.headers) {
      config.headers['Authorization'] = `Bearer ${authService.getToken()}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => Promise.reject(error.response.data),
);

export default instance;
