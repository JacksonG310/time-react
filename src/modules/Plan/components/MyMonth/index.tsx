import { TagItem, TaskItem } from "@/api/types";
import { SvgIcon } from "@/components";
import { PlanCalendar } from "@/components/base/PlanCalendar";
import { matterActions } from "@/modules/Matter";
import { RootState } from "@/types";
import { dateFormat, timeFormat } from "@/utils/timePickerUtil";
import dayjs, { Dayjs } from "dayjs";
import React, { MouseEvent, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { planAction } from "../..";
import "./index.less";

interface StateProps {
    tags: Array<TagItem>;
    tasks: Array<TaskItem>;
    currentDate: Dayjs;
}

export interface TaskCellData extends TaskItem {
    color: string;
}

interface Props extends StateProps { }

const computedTaskCell = (tasks: Array<TaskItem>, tags: Array<TagItem>) => {
    const dataMap: { [k: string]: Array<TaskCellData> } = {};
    tasks.forEach((item) => {
        const startTime = dayjs(item.startTime).format(dateFormat);
        const cellData: TaskCellData = {
            ...item,
            color: tags.find((tag) => tag.id === item.classifyId)!.color,
        }
        if (!dataMap[startTime]) {
            dataMap[startTime] = [] as Array<TaskCellData>;
        }
        dataMap[startTime].push(cellData);
    });
    return dataMap;
}

const getCellData = (value: Dayjs, dataMap: { [k: string]: Array<TaskCellData> }) => {
    const targetDate = value.format(dateFormat);
    return dataMap[targetDate] || [];
}

const MyMonthBase: React.FC<Props> = (props) => {
    const { tags, tasks, currentDate } = props;

    const dataMap = useMemo(() => computedTaskCell(tasks, tags), [tags, tasks])

    const renderCell = (value: Dayjs) => {
        const data = getCellData(value, dataMap);
        const taskCell = data.map((item, index) => {
            return (
                <div
                    className={`task-cell${item.status === 1 ? ' finished' : ''}`}
                    key={index}
                    onClick={(e) => onTaskCellClick(e, item)}>
                    <div className="task-cell-wrap" style={{ background: `${item.color}` }}>
                        <span className="task-cell-title">
                            {item.title}
                        </span>
                        <span className="task-cell-time">
                            {dayjs(item.startTime).format(timeFormat)}
                        </span>
                    </div>
                </div>
            )
        })
        return taskCell;
    }

    const onTaskCellClick = async (e: MouseEvent<HTMLDivElement>, item: TaskCellData) => {
        e.stopPropagation();
        matterActions.changleAddFormVisible(true, true);
        matterActions.setTaskForm('id', item.id);
        await matterActions.getTaskById(item.id);
    }


    const getData = async () => {
        await matterActions.getAllTags();
        await matterActions.getAllTasks();
    }
    useEffect(() => {
        getData();
        planAction.changeCurrentDate(dayjs());
    }, []);

    const changeDate = (value: Dayjs) => planAction.changeCurrentDate(value);


    return (
        <div className="myMonth-page">
            <PlanCalendar renderCell={renderCell} date={currentDate} />
            <div className="left-arrow" onClick={() => changeDate(currentDate.add(-1, 'M'))}>
                <SvgIcon name="left" width="16px" height="16px" />
            </div>
            <div className="right-arrow" onClick={() => changeDate(currentDate.add(1, 'M'))}>
                <SvgIcon name="right" width="16px" height="16px" />
            </div>
        </div>
    )
}

function mapStateToProps(state: RootState): StateProps {

    return {
        tags: state.root.matterModule.tags,
        tasks: state.root.matterModule.tasks,
        currentDate: state.root.planModule.currentDate
    }
}

const MyMonth = connect(mapStateToProps)(MyMonthBase);

export default MyMonth;