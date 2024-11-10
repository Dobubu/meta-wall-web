import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const loading = ref(false);
  const updateLoading = (state: boolean) => (loading.value = state);

  return {
    updateLoading,
    loading,
  };
});
