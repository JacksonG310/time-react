import { SvgIcon } from "@/components";
import SubTask from "@/components/SubTask";
import { matterActions, TaskForm } from "@/modules/Matter";
import { RootState } from "@/types";
import TextArea from "antd/es/input/TextArea";
import React, { ChangeEvent, useState } from "react";
import { connect } from "react-redux";

interface StateProps {
    taskForm: TaskForm;
}

interface Props extends StateProps { }

const FormMoreBase: React.FC<Props> = (props) => {
    const { taskForm } = props;

    const handleMarkChange = (e: ChangeEvent<HTMLTextAreaElement>) => matterActions.setTaskForm('remark', e.target.value);
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
            <div className="fail-row">
                <div className="fail-btn">
                    <div className="fail-icon">
                        <SvgIcon width="20px" height="20px" name="fail" />
                    </div>
                    <span>失败</span>
                </div>
            </div>
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