import { SvgIcon } from "@/components";
import SubTask from "@/components/SubTask";
import { matterActions, TaskForm } from "@/modules/Matter";
import { RootState } from "@/types";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import React, { ChangeEvent, MouseEvent, useState } from "react";
import { connect } from "react-redux";

interface StateProps {
    taskForm: TaskForm;
}

interface Props extends StateProps {
    isEdit: boolean;
}

const FormMoreBase: React.FC<Props> = (props) => {
    const { taskForm, isEdit } = props;
    const handleMarkChange = (e: ChangeEvent<HTMLTextAreaElement>) => matterActions.setTaskForm('remark', e.target.value);

    const handleTaskFail = async (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const { id } = taskForm;
        const body = {
            taskId: id,
            finishTime: dayjs().toDate(),
            finishStatus: 2,
            status: 1,
            updated: dayjs().toDate()
        }
        await matterActions.updateTaskStatus(body);
        await matterActions.getAllTasks();
    }
    return (
        <div className="formMore">
            {/* <SubTask /> */}
            <div className="mark-row">
                <TextArea
                    value={taskForm.remark}
                    bordered={false}
                    rows={4}
                    placeholder="备注"
                    autoSize={{ minRows: 2, maxRows: 6 }}
                    onChange={handleMarkChange} />
            </div>
            {
                (isEdit && taskForm.status == 0) ? (
                    <div className="fail-row">
                        <div className="fail-btn" onClick={handleTaskFail}>
                            <div className="fail-icon">
                                <SvgIcon width="20px" height="20px" name="fail" />
                            </div>
                            <span>失败</span>
                        </div>
                    </div>
                ) : <></>
            }
        </div>
    )
}

function mapStateToProps(state: RootState) {
    return {
        taskForm: state.root.matterModule.taskForm
    }
}
const FormMore = connect(mapStateToProps)(FormMoreBase);
export default FormMore;