import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const dayFormate = (date: string, format = 'YYYY/MM/DD HH:mm') => dayjs(date).format(format);

export const dayTimeToNow = (date: string) => dayjs(date).toNow(true);
