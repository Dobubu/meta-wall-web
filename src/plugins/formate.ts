import dayjs from 'dayjs';

export const dayFormate = (date: string, format = 'YYYY/MM/DD HH:mm') => dayjs(date).format(format);
