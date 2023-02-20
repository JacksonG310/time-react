import dayjs, { Dayjs } from "dayjs";

export interface DateInfo {
    dateDayJS: Dayjs;
    dateYear: number;
    dateMount: number;
    dateValue: number;
    dateDay: number;
}

const getYearAndMonth = (value: Dayjs) => {
    const year = value.toDate().getFullYear();
    const month = value.toDate().getMonth();
    return [year, month];
}

const wrapDate = (year: number, month: number, dateValue: number): DateInfo => {
    const dateDayJS = dayjs(`${year}-${month + 1}-${dateValue}`);
    const date = dateDayJS.toDate();
    return {
        dateDayJS,
        dateYear: date.getFullYear(),
        dateMount: date.getMonth() + 1,
        dateValue: date.getDate(),
        dateDay: date.getDay()
    }
}

export const getCurrentMonthFirstDay = (value: Dayjs) => {
    const [year, month] = getYearAndMonth(value);
    const day = new Date(year, month, 1).getDay();
    return day;
}

export const getPrevMonthRestDays = (value: Dayjs) => {
    const [year, month] = getYearAndMonth(value);
    const date = new Date(year, month, 0);
    let dayNums = date.getDay() + 1;
    let dateValue = date.getDate();
    const restDays: Array<DateInfo> = [];
    while (dayNums != 0) {
        const item = wrapDate(
            month === 0 ? year - 1 : year,
            month === 0 ? 11 : month - 1,
            dateValue--
        )
        restDays.push(item);
        dayNums--;
    }
    return restDays.reverse();
}

export const getCurrentMonthCount = (value: Dayjs) => {
    const [year, month] = getYearAndMonth(value);
    const dayNums = new Date(year, month + 1, 0).getDate();
    return dayNums;
}


export const getNextMonthRestDays = (value: Dayjs) => {
    const [year, month] = getYearAndMonth(value);
    const prevMonthCount = getCurrentMonthFirstDay(value);
    const currentMonthCount = getCurrentMonthCount(value);
    const nextMonthCount = 42 - (prevMonthCount + currentMonthCount);
    const restDays: Array<DateInfo> = [];

    for (let i = 1; i <= nextMonthCount; i++) {
        const item = wrapDate(
            month === 11 ? year + 1 : year,
            month === 11 ? 0 : month + 1,
            i
        )
        restDays.push(item);
    }
    return restDays;
}


export const getCurrentMonthDays = (value: Dayjs) => {
    const [year, month] = getYearAndMonth(value);
    const prevMonthDays = getPrevMonthRestDays(value);
    const nextMonthDays = getNextMonthRestDays(value);
    const currentMonthCount = getCurrentMonthCount(value);
    const currentMonthDays: Array<DateInfo> = [];
    for (let i = 1; i <= currentMonthCount; i++) {
        const item = wrapDate(
            year,
            month,
            i
        )
        currentMonthDays.push(item);
    }
    return prevMonthDays.concat(currentMonthDays, nextMonthDays);
}


export const getDateInfo = (value: Dayjs) => {
    const year = value.year();
    const month = value.month();
    const date = value.date();
    const day = value.day();
    return [year, month, date, day];
}


const getPrevDaysInWeek = (value: Dayjs) => {
    const nums = value.day();

    const prevDays: Array<DateInfo> = [];
    for (let i = 1; i <= nums; i++) {
        const itemDayJS = value.add((-1 * i), 'day');
        const item: DateInfo = {
            dateDayJS: itemDayJS,
            dateYear: itemDayJS.year(),
            dateMount: itemDayJS.month() + 1,
            dateDay: itemDayJS.day(),
            dateValue: itemDayJS.date()
        }
        prevDays.push(item);
    }
    return prevDays.reverse();
}

const getNextDaysInWeek = (value: Dayjs) => {
    const nums = 6 - value.day();
    const nextDays: Array<DateInfo> = [];
    for (let i = 1; i <= nums; i++) {
        const itemDayJS = value.add(i, 'day');
        const item: DateInfo = {
            dateDayJS: itemDayJS,
            dateYear: itemDayJS.year(),
            dateMount: itemDayJS.month() + 1,
            dateDay: itemDayJS.day(),
            dateValue: itemDayJS.date()
        }
        nextDays.push(item);
    }
    return nextDays;
}


export const getCurrentDaysInWeek = (value: Dayjs) => {
    const prevDays = getPrevDaysInWeek(value);
    const nextDays = getNextDaysInWeek(value);
    const [year, month, date, day] = getDateInfo(value);
    const currentDay: DateInfo = {
        dateDayJS: value,
        dateYear: year,
        dateMount: month + 1,
        dateDay: day,
        dateValue: date
    }
    return prevDays.concat(currentDay, nextDays);
}