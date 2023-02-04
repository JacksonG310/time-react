import { SvgIcon } from "@/components";
import React from "react";

const FormCommon = () => {

    return (
        <div className="formCommon">
            <div className="formCommonWrap">
                <div className="time-row">
                    <div className="clock-icon">
                        <SvgIcon name="clock" width="16px" height="16px" />
                    </div>
                    <div className="addTime">
                        添加事件
                    </div>
                </div>
            </div>
        </div>
    )
}

export { FormCommon }