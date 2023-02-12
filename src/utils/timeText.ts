import dayjs from "dayjs";
import { weeks } from "./timePickerUtil";

export const computedTimeText = (from: (Date | null), to: (Date | null)) => {
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