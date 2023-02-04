import React from "react";
import { SvgIcon } from "..";
import "./index.less";
interface AddBtnProps {
    onClick?: Function;
}

const AddBtn: React.FC<AddBtnProps> = (props) => {
    const handleClick = (e: React.MouseEvent) => props.onClick && props.onClick(e);
    return (
        <div className="addBtn" onClick={handleClick}>
            <div className="addBtnWrap">
                <div className="icon">
                    <SvgIcon width="21px" height="21px" name="add" />
                </div>
            </div>
        </div>
    )
}
export default AddBtn;