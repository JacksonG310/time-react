import React, { useState } from "react";
import { Button, DatePicker, message, TimePicker } from "antd";
import "./index.less";
import dayjs, { Dayjs } from "dayjs";
import { dateFormat, dateTimeFormat, dateTimeformator, timeFormat } from "@/utils/timePickerUtil";

interface Props {
    onCancel: () => void;
    onSave: (time: Date | Array<Date>) => void;
}

interface TimeInfo {
    timeDots: {
        date: Dayjs | null;
        time: Dayjs | null;
    };
    timeQuantum: {
        form: Dayjs | null,
        to: Dayjs | null
    }
}


const TimerPicker: React.FC<Props> = (props) => {
    const { onCancel, onSave } = props;
    const [isDots, setIsDots] = useState(true);
    const [timeInfo, setTimeInfo] = useState<TimeInfo>({
        timeDots: {
            date: null,
            time: null
        },
        timeQuantum: {
            form: null,
            to: null
        }
    })
    const changeMode = (mode: boolean) => (setIsDots(mode));
    const handleDatePickerChange = (date: Dayjs | null) => {
        if (date) {
            setTimeInfo({
                ...timeInfo,
                timeDots: {
                    ...timeInfo.timeDots,
                    date
                }
            })
        }
    };
    const handleTimePickerChange = (time: Dayjs | null) => {
        if (time) {
            setTimeInfo({
                ...timeInfo,
                timeDots: {
                    ...timeInfo.timeDots,
                    time
                }
            })
        }
    }
    const handleRangPickerChange = (dates: Array<Dayjs | null> | null) => {
        if (dates && dates[0] && dates[1]) {
            setTimeInfo({
                ...timeInfo,
                timeQuantum: {
                    form: dates[0],
                    to: dates[1]
                }
            })
        }
    }

    const handleSave = () => {
        if (isDots && timeInfo.timeDots.date === null || !isDots && timeInfo.timeQuantum === null) {
            message.error("请选择时间或时间段");
            return;
        } else {
            if (isDots) {
                const timeDots = dateTimeformator(timeInfo.timeDots.date!, timeInfo.timeDots.time!).toDate();
                onSave && onSave(timeDots);
            } else {
                const timeQuantum = [
                    timeInfo.timeQuantum.form!.toDate(),
                    timeInfo.timeQuantum.to!.toDate()
                ]
                onSave && onSave(timeQuantum);
            }
        }
    }
    const disabledDate = (date: Dayjs) => date < dayjs().add(-1, 'day');
    const disabledTime = (time: Dayjs) => {
    }
    return (
        <div className="time-picker">
            <div className="button-group">
                <Button type={isDots ? 'primary' : 'default'} onClick={() => changeMode(true)}>时间点</Button>
                <Button type={!isDots ? 'primary' : 'default'} onClick={() => changeMode(false)}>时间段</Button>
            </div>
            {
                isDots ? (
                    <div className="picker-time-dots">
                        <div className="date-picker">
                            <span>日期：</span>
                            <DatePicker
                                allowClear={false}
                                defaultPickerValue={dayjs()}
                                onChange={handleDatePickerChange}
                                disabledDate={disabledDate}
                            />
                        </div>
                        <div className="stamp-picker">
                            <span>时间：</span>
                            <TimePicker
                                allowClear={false}
                                defaultPickerValue={dayjs(timeFormat)}
                                format={timeFormat}
                                onChange={handleTimePickerChange}
                            // disabledTime={disabledTime}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="picker-time-quantum">
                        <div className="date-picker">
                            <span>日期&时间：</span>
                            <DatePicker.RangePicker
                                onChange={handleRangPickerChange}
                                showTime
                                format={dateTimeFormat}
                                defaultPickerValue={[dayjs(), dayjs().add(1, 'm')]}
                                allowClear={false}
                            />
                        </div>
                    </div>
                )
            }
            <div className="time-pick-footer">
                <Button className="picker-cancle" onClick={onCancel}>取消</Button>
                <Button className="picker-save" type="primary" onClick={handleSave}>保存</Button>
            </div>
        </div>
    )

}

export { TimerPicker };