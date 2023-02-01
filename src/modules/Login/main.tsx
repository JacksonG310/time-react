import React from "react";
import { Outlet } from "react-router-dom";
import "./index.less";
const Login = () => {
    return (
        <div className="login-view">
            <div className="login-view-body">
                <div className="login-view-header">
                    <span className="header-title">
                        日程管理系统
                    </span>
                </div>
                <div className="login-view-main">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Login;