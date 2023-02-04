import React from "react";
import { Scroll } from "../base/Scroll";
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
                <Scroll width="240px" height="100%" maxWidth="240px" maxHeight="100%" direction="y" trigger="hover">
                    <NavBody />
                </Scroll>
            </div>
        </div>
    )
}

export { NavBar };