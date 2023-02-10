import React from "react";
import { SvgIcon } from "..";
import "./index.less";
const SubTask = () => {
    return (
        <div className="subtask">
            <div className="addSubtask">
                <div className="addSubtask-btn">
                    <div className="task-icon">
                        <SvgIcon width="20px" height="20px" name="task" />
                    </div>
                    添加子任务
                </div>
            </div>
        </div>
    )
}

export default SubTask;