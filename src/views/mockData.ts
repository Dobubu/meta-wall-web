import dayjs from 'dayjs';

import { PostType } from '@/components/post/type';

export const mock = {
  user: {
    _id: '627f0878ed9cb61da8049f43',
    name: 'John',
    photo: 'https://thumb.fakeface.rest/thumb_male_10_8c02e4e9bdc0e103530691acfca605f18caf1766.jpg',
  },
  postList: [
    {
      _id: '12345',
      user: {
        _id: '123451',
        name: '邊緣小杰',
        photo:
          'https://i.picsum.photos/id/443/200/200.jpg?hmac=ceI_qNYuyS_i8MicdRztsYDJLek0_-IDsEwLhAfaIEo',
      },
      tags: ['test'],
      type: PostType.PERSON,
      image:
        'https://i.picsum.photos/id/443/200/200.jpg?hmac=ceI_qNYuyS_i8MicdRztsYDJLek0_-IDsEwLhAfaIEo',
      photo:
        'https://i.picsum.photos/id/443/200/200.jpg?hmac=ceI_qNYuyS_i8MicdRztsYDJLek0_-IDsEwLhAfaIEo',
      createdAt: dayjs().format('YYYY/MM/DD HH:mm'),
      content: '外面看起來就超冷.... 我決定回被窩繼續睡....>.<',
      likes: 0,
      comments: [
        {
          name: '希琳',
          photo:
            'https://i.picsum.photos/id/225/200/300.jpg?hmac=HoopVmaDuZW8v_8n33eWQvN3hdmFj9gP2m3AWvybT8s',
          content: '真的～我已經準備冬眠了',
          createdAt: dayjs().format('YYYY/MM/DD HH:mm'),
        },
        {
          name: '波吉',
          photo:
            'https://i.picsum.photos/id/648/200/200.jpg?hmac=Kb_qhDdDfOGevrbabLvz4Tp3fu-M7DxQE6APqQRnwVw',
          content: '會嗎？我沒穿衣服都不覺得冷',
          createdAt: dayjs().format('YYYY/MM/DD HH:mm'),
        },
      ],
    },
    {
      _id: '22222',
      user: {
        _id: '222221',
        name: '波吉',
        photo:
          'https://i.picsum.photos/id/648/200/200.jpg?hmac=Kb_qhDdDfOGevrbabLvz4Tp3fu-M7DxQE6APqQRnwVw',
      },
      tags: ['test'],
      type: PostType.PERSON,
      image: '',
      photo:
        'https://i.picsum.photos/id/648/200/200.jpg?hmac=Kb_qhDdDfOGevrbabLvz4Tp3fu-M7DxQE6APqQRnwVw',
      createdAt: dayjs().format('YYYY/MM/DD HH:mm'),
      content: '我一定要成為很棒棒的國王！',
      likes: 3,
      comments: [],
    },
    {
      _id: '33333',
      user: {
        _id: '333331',
        name: '阿爾敏',
        photo:
          'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
      },
      tags: ['test'],
      type: PostType.GROUP,
      image: '',
      photo:
        'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
      createdAt: dayjs().format('YYYY/MM/DD HH:mm'),
      content: '各位我有一個作戰計畫',
      likes: 0,
      comments: [],
    },
  ],
  list: [
    {
      _id: '22222',
      name: '波吉',
      photo:
        'https://i.picsum.photos/id/443/200/200.jpg?hmac=ceI_qNYuyS_i8MicdRztsYDJLek0_-IDsEwLhAfaIEo',
      createAt: dayjs().format('YYYY/MM/DD HH:mm'),
      followTime: dayjs().format('DD'),
      followFromTime: dayjs().format('YYYY/MM/DD HH:mm'),
    },
    {
      _id: '55555',
      name: '多魯米',
      photo:
        'https://i.picsum.photos/id/225/200/300.jpg?hmac=HoopVmaDuZW8v_8n33eWQvN3hdmFj9gP2m3AWvybT8s',
      createAt: dayjs().format('YYYY/MM/DD HH:mm'),
      followTime: dayjs().format('DD'),
      followFromTime: dayjs().format('YYYY/MM/DD HH:mm'),
    },
    {
      _id: '66666',
      name: '卡克',
      photo:
        'https://i.picsum.photos/id/648/200/200.jpg?hmac=Kb_qhDdDfOGevrbabLvz4Tp3fu-M7DxQE6APqQRnwVw',
      createAt: dayjs().format('YYYY/MM/DD HH:mm'),
      followTime: dayjs().format('DD'),
      followFromTime: dayjs().format('YYYY/MM/DD HH:mm'),
    },
    {
      _id: '44444',
      name: '希琳',
      photo:
        'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
      createAt: dayjs().format('YYYY/MM/DD HH:mm'),
      followTime: dayjs().format('DD'),
      followFromTime: dayjs().format('YYYY/MM/DD HH:mm'),
    },
    {
      _id: '77777',
      name: '多瑪斯',
      photo:
        'https://i.picsum.photos/id/777/200/300.jpg?hmac=eJq2XzCPCPppgoS96ReNEmweR3Wloh4ZsbWIgec36Uo',
      createAt: dayjs().format('YYYY/MM/DD HH:mm'),
      followTime: dayjs().format('DD'),
      followFromTime: dayjs().format('YYYY/MM/DD HH:mm'),
    },
  ],
};
