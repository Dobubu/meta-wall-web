import { ref } from 'vue';

import { apiGetMessageList } from '@/api/chat';
import { timeFormate } from '@/lib/formate';

export const useChatroom = () => {
  const list = ref<any[]>([]);

  const fetchList = async () => {
    try {
      const res = await apiGetMessageList();
      list.value = res.data.map((o: any) => {
        return {
          ...o,
          createdAt: timeFormate(o.createdAt),
        };
      });
    } catch (error) {
      //
    }
  };

  const updateList = (msg: any) => {
    list.value = [
      ...list.value,
      {
        ...msg,
        createdAt: timeFormate(msg.createdAt),
      },
    ];
  };

  return {
    list,
    fetchList,
    updateList,
  };
};
