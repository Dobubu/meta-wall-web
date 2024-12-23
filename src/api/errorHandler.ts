import { AlertState, useAlertStore } from '@/store/alert';

export const axiosErrorHandler = (error: any) => {
  const { show } = useAlertStore();

  const status = error?.response?.status;
  const errorMessage = error?.response?.data.message;

  switch (status) {
    case 401:
      show(`${status} - ${errorMessage}。3秒後自動登出`, AlertState.ERROR);
      break;
    case 403:
      break;
    case 404:
      // TODO:導頁到 404 page
      break;
    case 422:
      break;
    default:
      break;
  }

  if (status !== 401) {
    show(`${status} - ${errorMessage}`, AlertState.ERROR);
    console.log('status:', status);
  }
};
