import React from "react";
import AppWithRouter from "./routes";
import './App.less';
import { useWindowSize } from "./utils/useWidowSize";
useWindowSize();
const App = () => {
    return (
        <div className="view">
            <AppWithRouter />
        </div>
    )
}

export default App;