import { computed } from 'vue';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
  const isDemo = computed(() => import.meta.env.VITE_PROJECT_STATE === 'demo');
  const useLocalhost = computed(() => import.meta.env.VITE_USE_LOCALHOST === 'true');

  const projectName = computed(() => (isDemo.value ? 'CircleSpot' : 'MetaWall'));

  return {
    isDemo,
    useLocalhost,

    projectName,
  };
});
