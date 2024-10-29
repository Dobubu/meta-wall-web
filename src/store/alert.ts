import { ref } from 'vue';
import { defineStore } from 'pinia';

export enum AlertState {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export const useAlertStore = defineStore('alert', () => {
  const message = ref('');
  const updateMessage = (data: string) => (message.value = data);

  const type = ref(AlertState.SUCCESS);
  const updateType = (data: AlertState) => (type.value = data);

  const duration = ref(3000);

  const showAlert = ref(false);
  const updateShowAlert = (state: boolean) => (showAlert.value = state);

  const show = (dataMsg: string, dataType: AlertState) => {
    updateMessage(dataMsg);
    updateType(dataType);
    updateShowAlert(true);
  };

  const hide = () => updateShowAlert(false);

  return {
    message,
    updateMessage,

    type,
    updateType,

    duration,

    showAlert,
    updateShowAlert,

    show,
    hide,
  };
});
