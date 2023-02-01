import AppWithRouter from "@/routes";
import { RootState } from "@/types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { mainActions } from ".";

interface StateProps {
    hasInitial: boolean;
    token: string | undefined;
}
interface Props extends StateProps { };

const MainBase: React.FC<Props> = (props) => {
    const { hasInitial, token } = props;
    useEffect(() => {
        if (!token) {
            mainActions.initAppInfo();
        } else {
            mainActions.init();
        }
    }, [])

    return hasInitial ? <AppWithRouter /> : <h1>等一等</h1>;

}
function mapStateToProps(state: RootState): StateProps {
    return {
        hasInitial: state.root.mainModule.hasInitial,
        token: state.root.userInfo?.token
    }
}

const Main = connect(mapStateToProps)(MainBase);

export default Main;