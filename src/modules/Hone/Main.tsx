import { NavBar } from "@/components/NavBar";
import React from "react";
import { Outlet } from "react-router-dom";
import "./Main.less";
const HomeBase = () => {
    return (
        <div className="home-view">
            <div className="left">
                <NavBar />
            </div>
            <div className="right">
                <Outlet />
            </div>
        </div>
    )
}

export default HomeBase;