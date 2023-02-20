import dayjs, { Dayjs } from "dayjs";

export const generateHours = (start?: number, end?: number) => {
    start = start || 0;
    end = end || 23;

    start = Math.max(0, start);
    end = Math.min(end, 23);

    const hours = [];
    for (let i = start; i <= end; i++) {
        hours.push(i < 10 ? '0' + i : i + '');
    }
    return hours;
}

export const generateMinutes = (start?: number, end?: number) => {
    start = start || 0;
    end = end || 59;

    start = Math.max(0, start);
    end = Math.min(end, 59);

    const minutes = [];
    for (let i = start; i <= end; i++) {
        minutes.push(i < 10 ? '0' + i : i + '');
    }
    return minutes;
}

export const timeFormat = "HH:mm";
export const dateFormat = "YYYY-MM-DD";
export const dateTimeFormat = "YYYY-MM-DD HH:mm";
export const yearMonthFormat = "YYYY/MM";

export const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

export const dateTimeformator = (date: Dayjs, time: Dayjs) => {
    const d = dayjs(date).format(dateFormat);
    const t = dayjs(time).format(timeFormat);
    const dots = dayjs(d + t);
    return dots;
}

