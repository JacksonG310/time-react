import { TaskItem, UpdateStatusBody$POST } from "@/api/types";
import { matterActions } from "@/modules/Matter";
import dayjs from "dayjs";
import React, { MouseEvent, useState } from "react";
import { SvgIcon } from "..";
import "./index.less";
interface ListItemProps {
    item: TaskItem
}

const ListItem: React.FC<ListItemProps> = (props) => {
    const { status, title, id, finishStatus, finishTime } = props.item;
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
    }
    const getTaskById = async () => {
        await matterActions.getTaskById();
    }
    const goToEdit = async (item: TaskItem) => {
        matterActions.changleAddFormVisible(true, true);
        matterActions.setTaskForm('id', item.id);
        await getTaskById();
    }
    return (
        <div className="listItem" onClick={() => goToEdit(props.item)}>
            <div className="itemContent">
                <div className="itemParent">
                    <div className="finish" onClick={changeStatus}>
                        {
                            (status === 0) ?
                                <div className="circle"></div> :
                                <div>
                                    <SvgIcon name="finish" width="16px" height="16px" />
                                </div>
                        }
                    </div>
                    <div className="content">{title}</div>
                    {/* <div className="more" style={{ "display": isHover && more ? 'block' : 'none' }}>更多</div> */}
                </div>
                <div className="itemMore"></div>
            </div>
        </div>
    )
}

export default ListItem;