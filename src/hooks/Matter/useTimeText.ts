import { weeks } from "@/utils/timePickerUtil";
import dayjs from "dayjs";
import { useState } from "react"

export const useTimeText = () => {
    const [text, setText] = useState('设置时间');

    const setBtnText = (time: Date | Array<Date>) => {
        let btnText = '';
        if (!Array.isArray(time)) {
            const date = dayjs(time).format('YYYY/MM/DD');
            const week = weeks[time.getDay()];
            const timeStamp = dayjs(time).format('HH:mm');
            btnText = `${date} ${week} ${timeStamp}`;
        } else {
            const [from, to] = time;
            const fromDate = dayjs(from).format('YYYY/MM/DD');
            const toDate = dayjs(to).format('YYYY/MM/DD');

            const fromTime = dayjs(from).format('HH:mm');
            const toTime = dayjs(to).format('HH:mm');
            if (fromDate === toDate) {
                btnText = `${fromDate} ${fromTime} ~ ${toTime}`
            } else {
                btnText = `${fromDate} ${fromTime} ~ ${toDate} ${toTime}`
            }
            setText(btnText);
        }
    }
    return { text, setBtnText };
}