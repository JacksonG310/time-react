import { SvgIcon } from "@/components";
import { TimerPicker } from "@/components/TImerPicker";
import { matterActions, TaskForm } from "@/modules/Matter";
import { RootState } from "@/types";
import { computedTimeText } from "@/utils/timeText";
import { Popover } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
interface StateProps {
    taskForm: TaskForm
}
interface Props extends StateProps { };
const FormCommonBase: React.FC<Props> = (props) => {
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const handleCancel = () => setIsPickerOpen(false);

    const handleSave = (timeInfo: Date | Array<Date>) => {
        const time: { [key: string]: Date } = {};
        if (Array.isArray(timeInfo)) {
            time.from = timeInfo[0];
            time.to = timeInfo[1];
        } else {
            time.from = timeInfo;
            time.to = timeInfo;
        }
        matterActions.setTaskForm('startTime', time.from);
        matterActions.setTaskForm('endTime', time.to);
        setIsPickerOpen(false);
    }
    return (
        <div className="formCommon">
            <div className="formCommonWrap">
                <div className="time-row">
                    <div className="clock-icon">
                        <SvgIcon name="clock" width="16px" height="16px" />
                    </div>
                    <div className="addTime">
                        <Popover
                            content={<TimerPicker onCancel={handleCancel} onSave={handleSave} />}
                            trigger="click"
                            placement="bottomLeft"
                            open={isPickerOpen}
                            onOpenChange={(open) => setIsPickerOpen(open)}
                        >
                            {
                                props.taskForm.startTime == null && props.taskForm.endTime == null ? ('设置时间') :
                                    computedTimeText(props.taskForm.startTime, props.taskForm.endTime)
                            }
                        </Popover>
                    </div>
                </div>
            </div>
        </div >
    )
}

function mapStateToProps(state: RootState): StateProps {
    return {
        taskForm: state.root.matterModule.taskForm
    }
}

const FormCommon = connect(mapStateToProps)(FormCommonBase);

export { FormCommon }