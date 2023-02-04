import { SvgIcon } from "@/components";
import TextArea from "antd/es/input/TextArea";
import React from "react";

const FormMore = () => {
    return (
        <div className="formMore">
            <div className="subtask-row">
                <div className="addSubtask">
                    <div className="addSubtask-btn">
                        <div className="task-icon">
                            <SvgIcon width="20px" height="20px" name="task" />
                        </div>
                        添加子任务
                    </div>
                </div>
            </div>
            <div className="mark-row">
                <TextArea bordered={false} rows={4} placeholder="备注" autoSize={{ minRows: 2, maxRows: 6 }} />
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

export default FormMore;