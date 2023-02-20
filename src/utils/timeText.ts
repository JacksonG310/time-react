import dayjs from "dayjs";
import { dateFormat, weeks } from "./timePickerUtil";

export const computedTimeRangeText = (from: (Date | null), to: (Date | null)) => {
    let btnText = '';
    const fromDayJS = dayjs(from);
    const toDayJS = dayjs(to);

    const fromDate = fromDayJS.format('YYYY/MM/DD');
    const toDate = toDayJS.format('YYYY/MM/DD');

    const fromTime = fromDayJS.format('HH:mm');
    const toTime = toDayJS.format('HH:mm');
    if (fromDate === toDate) {
        const week = weeks[fromDayJS.day()];
        if (fromTime === toTime) {
            btnText = `${fromDate} ${week} ${fromTime}`
        } else {
            btnText = `${fromDate} ${week} ${fromTime} ~ ${toTime}`
        }
    } else {
        btnText = `${fromDate} ${fromTime} ~ ${toDate} ${toTime}`
    }
    return btnText;
}

export const computedTimeText = (t: Date) => {
    const timeDayJS = dayjs(t);
    const date = timeDayJS.format('YYYY/MM/DD');
    const time = timeDayJS.format('HH:mm');
    const week = weeks[timeDayJS.day()];
    return `${date} ${week} ${time}`
}

export const computedLastTimeText = (from: (Date | null), to: (Date | null)) => {
    const fromDayJS = dayjs(from);
    const toDayJS = dayjs(to);

    const timeDiff = toDayJS.diff(fromDayJS);
    if (timeDiff <= 0) return `--天--小时--分钟`
    const seconds = timeDiff / 1000;
    const day = Math.floor(seconds / (60 * 60 * 24));
    const hours = Math.floor((seconds / (60 * 60)) % 24);
    const minutes = Math.floor((seconds / 60) % 60);

    return `${day}天${hours}小时${minutes}分钟`
}

export const computedLatestTime = (t: Date, status: boolean) => {
    const finishDate = dayjs(t);
    const todayDayJS = dayjs();

    let date = '';
    let time = finishDate.format('HH:mm');
    let week = weeks[finishDate.day()];
    let delay = '';

    const dateDiff = finishDate.format('YYYY/MM/DD') === todayDayJS.format('YYYY/MM/DD');

    if (dateDiff) {
        date = '今天';
    } else {
        date = finishDate.format('MM/DD');
        const timeDiff = finishDate.diff(todayDayJS);
        if (timeDiff < 0) {
            const seconds = Math.abs(timeDiff / 1000);
            const day = Math.ceil(seconds / (60 * 60 * 24));
            delay = `延期${day}天`;
        }
    }

    return `${date} ${time} ${week} ${status ? '' : delay}`
}

export const isDelay = (finish: Date, status: boolean) => {
    const finishDate = dayjs(finish).format(dateFormat);
    const todayDate = dayjs().format(dateFormat);
    const timeDiff = finishDate === todayDate;
    return !timeDiff && !status
}