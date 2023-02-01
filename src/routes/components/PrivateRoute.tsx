import { RootState } from "@/types";
import { AppLocalInfo } from "@/utils/storage";
import React from "react";
import { connect } from "react-redux";
import { Navigate, Route, PathRouteProps, Routes } from "react-router-dom";

interface StateProps {
    userInfo: AppLocalInfo | null;
}

interface Props extends StateProps, PathRouteProps { };
const redirectLogin = () => <Navigate to="/account/login" />;
const PrvateRouteBase: React.FC<Props> = (props) => {
    const { element, userInfo, ...restProps } = props;
    return (
        <Routes>
            <Route path="*" {...restProps} element={userInfo ? element : redirectLogin()} />
        </Routes>
    )
}


function mapStateToProps(state: RootState) {
    return {
        userInfo: state.root.mainModule.userInfo
    }
}
const PrivateRoute = connect(mapStateToProps)(PrvateRouteBase);

export default PrivateRoute;