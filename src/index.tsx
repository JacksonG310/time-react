import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'normalize.css';
import '@/assets/index';
import { config } from "redux-assist";
import { errorHandler } from "./modules/ErrorHandler";
import { Provider } from "./components/Provider";

config.errorHandler = errorHandler;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider>
        <App />
    </Provider>
)