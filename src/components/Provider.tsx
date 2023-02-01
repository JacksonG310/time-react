import React, { ReactNode } from "react";
import { createStore } from "redux-assist";
import { Provider as BaseProvider } from "react-redux";
import { errorHandler } from "@/modules/ErrorHandler";

const store = createStore({ onError: errorHandler });

export const Provider: React.FC<{ children: ReactNode }> = React.memo(props => <BaseProvider store={store}>{props.children}</BaseProvider>)