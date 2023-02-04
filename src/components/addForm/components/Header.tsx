import { Selector } from "@/components";
import { SvgIcon } from "@/components/base/SvgIcon";
import { Input, Popover } from "antd";
import React from "react";

interface FormHeaderProps {
    // importance:Array<ImportanceIcon>
}

const FormHeader: React.FC<FormHeaderProps> = () => {
    return (
        <div className="formHeader">
            <div className="titleWrap">
                <Input placeholder="把事情记录下来" bordered={false} />
            </div>
            <Selector
                className="importanceSelector"
                icon="one"
                trigger="click"
                placement='rightBottom' />
            <Selector
                className="classifySelector"
                icon="three"
                trigger="click"
                placement='rightBottom' />
        </div>
    )
}

export { FormHeader }