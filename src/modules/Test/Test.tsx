import { Scroll, SvgIcon } from "@/components";
import { ICON_NAME } from "@/constants/icon";
import { computedIconLayout } from "@/utils/computedIconLayout";
import { Button, Carousel, Popover } from "antd";
import "./index.less";
import React, { ReactNode, useState } from "react";

const Test = () => {
    const [open, setOpen] = useState(false);

    const hide = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    return (
        <div className="test" style={{ width: '304px', height: '228px', }}>
            <Popover
                content={<a onClick={hide}>Close</a>}
                title="Title"
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
            >
                <div>
                    <SvgIcon name="more" width="18px" height="18px"></SvgIcon>
                </div>
            </Popover>
        </div>
    );
};


export default Test;