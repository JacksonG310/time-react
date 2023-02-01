import { SvgIcon } from "@/components";
import React from "react";

const NavHeader = () => {
    return (
        <div className="nav-header">
            <div className="left">
                <div className="avatar">
                    <img src="" alt="" />
                </div>
                <span className="username">小新我嫁给你哈哈哈哈哈哈</span>
            </div>
            <div className="right">
                <span style={{ "fontSize": "12px" }}>设置</span>
                <span style={{ "fontSize": "12px", "marginLeft": "5px" }}>刷新</span>
            </div>
        </div>
    )
}

export default NavHeader;