import { WEEK_MAP } from "@/constants/constants";
import React from "react";
import "./index.less";



const Header = () => (
    <ul className="header-wrap">
        {
            WEEK_MAP.map((item, index) => (
                <li className="header-item" key={index}>
                    {item}
                </li>
            ))
        }
    </ul>
)

export default Header;