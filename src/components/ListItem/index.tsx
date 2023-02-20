import { TaskItem } from "@/api/types";
import { matterActions } from "@/modules/Matter";
import { computedLatestTime, isDelay } from "@/utils/timeText";
import dayjs from "dayjs";
import React, { MouseEvent } from "react";
import { SvgIcon } from "..";
import "./index.less";
interface ListItemProps {
    item: TaskItem
}

const ListItem: React.FC<ListItemProps> = (props) => {
    const { status, title, id, finishStatus, finishTime, endTime } = props.item;
    const changeStatus = async (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const body = {
            taskId: id,
            finishTime: finishTime ? null : dayjs().toDate(),
            finishStatus: finishStatus ? null : 1,
            status: status === 0 ? 1 : 0,
            updated: dayjs().toDate()
        }
        await matterActions.updateTaskStatus(body);
        await matterActions.getAllTasks();

    }
    const getTaskById = async (taskId: number) => {
        await matterActions.getTaskById(taskId);
    }
    const goToEdit = async (item: TaskItem) => {
        matterActions.changleAddFormVisible(true, true);
        matterActions.setTaskForm('id', item.id);
        await getTaskById(item.id);
    }
    return (
        <div className="listItem" onClick={() => goToEdit(props.item)}>
            <div className="itemContent">
                <div className="itemParent">
                    <div className="finish" onClick={changeStatus}>
                        {
                            status === 0 ? (
                                <div className="circle"></div>
                            ) : (
                                finishStatus == 1 ? (
                                    <SvgIcon name="finish" width="16px" height="16px" />
                                ) : (
                                    <SvgIcon name="fail" width="16px" height="16px" />
                                )
                            )
                        }
                    </div>
                    <div className="content">
                        <div className="title">{title}</div>
                        <div className="info" style={{ color: isDelay(endTime, !!status) ? '#ff9461' : '#bdc0c7' }}>
                            {computedLatestTime(endTime, !!status)}
                        </div>
                    </div>
                    {/* <div className="more" style={{ "display": isHover && more ? 'block' : 'none' }}>更多</div> */}
                </div>
                <div className="itemMore"></div>
            </div>
        </div>
    )
}

export default ListItem;