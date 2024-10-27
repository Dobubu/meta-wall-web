import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', () => {
  const showModal = ref(false);
  const updateShowModal = (state: boolean) => (showModal.value = state);

  const content = ref('');
  const updateContent = (data: string) => (content.value = data);

  return {
    showModal,
    updateShowModal,

    content,
    updateContent,
  };
});
