import React from "react";
import { NavBody } from "./components/Body";
import NavHeader from "./components/Header";
import "./index.less";


const NavBar = () => {
    return (
        <div className="nav-bar">
            <div className="top">
                <NavHeader />
            </div>
            <div className="bottom">
                <NavBody />
            </div>
        </div>
    )
}

export { NavBar };