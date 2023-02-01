import React from "react";
import './App.less';
import { useWindowSize } from "./utils/useWidowSize";
import { Main } from "./modules/Main";
// useWindowSize();
const App = () => {
    return (
        <div className="view">
            <Main />
        </div>
    )
}

export default App;