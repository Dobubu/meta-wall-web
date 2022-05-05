import dayjs from 'dayjs';

import { PostType } from '../components/post/type';

export const mock = {
  user: {
    name: '邊緣小杰',
    photo:
      'https://i.picsum.photos/id/443/200/200.jpg?hmac=ceI_qNYuyS_i8MicdRztsYDJLek0_-IDsEwLhAfaIEo',
  },
  postList: [
    {
      name: '邊緣小杰',
      tags: ['test'],
      type: PostType.PERSON,
      image:
        'https://i.picsum.photos/id/443/200/200.jpg?hmac=ceI_qNYuyS_i8MicdRztsYDJLek0_-IDsEwLhAfaIEo',
      photo:
        'https://i.picsum.photos/id/443/200/200.jpg?hmac=ceI_qNYuyS_i8MicdRztsYDJLek0_-IDsEwLhAfaIEo',
      createAt: dayjs().format('YYYY/MM/DD HH:mm'),
      content: '外面看起來就超冷.... 我決定回被窩繼續睡....>.<',
      likes: 0,
      comments: [
        {
          name: '希琳',
          photo:
            'https://i.picsum.photos/id/225/200/300.jpg?hmac=HoopVmaDuZW8v_8n33eWQvN3hdmFj9gP2m3AWvybT8s',
          content: '真的～我已經準備冬眠了',
          createAt: dayjs().format('YYYY/MM/DD HH:mm'),
        },
        {
          name: '波吉',
          photo:
            'https://i.picsum.photos/id/648/200/200.jpg?hmac=Kb_qhDdDfOGevrbabLvz4Tp3fu-M7DxQE6APqQRnwVw',
          content: '會嗎？我沒穿衣服都不覺得冷',
          createAt: dayjs().format('YYYY/MM/DD HH:mm'),
        },
      ],
    },
    {
      name: '波吉',
      tags: ['test'],
      type: PostType.PERSON,
      image: '',
      photo:
        'https://i.picsum.photos/id/648/200/200.jpg?hmac=Kb_qhDdDfOGevrbabLvz4Tp3fu-M7DxQE6APqQRnwVw',
      createAt: dayjs().format('YYYY/MM/DD HH:mm'),
      content: '我一定要成為很棒棒的國王！',
      likes: 3,
      comments: [],
    },
    {
      name: '阿爾敏',
      tags: ['test'],
      type: PostType.GROUP,
      image: '',
      photo:
        'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
      createAt: dayjs().format('YYYY/MM/DD HH:mm'),
      content: '各位我有一個作戰計畫',
      likes: 0,
      comments: [],
    },
  ],
};
