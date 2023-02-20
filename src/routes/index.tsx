import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from '@/modules/Login';
import LoginMainBox from "@/modules/Login/components/LoginMainBox";
import ReigsterMain from "@/modules/Login/components/Register";
import PrivateRoute from "./components/PrivateRoute";
import HomeBase from "@/modules/Hone/Main";
import Matter from "@/modules/Matter/Main";
import Importance from "@/modules/Matter/components/Importance";
import Schedule from "@/modules/Matter/components/Schedule";
import CheckList from "@/modules/Matter/components/CheckList";
import Test from "@/modules/Test/Test";
import MyMonth from "@/modules/Plan/components/MyMonth";
import { Plan } from "@/modules/Plan";
import MyWeek from "@/modules/Plan/components/MyWeek";
const AppWithRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="test" element={<Test />} />
                <Route path="/account" element={<LoginPage />} >
                    <Route path="login" element={<LoginMainBox />} />
                    <Route path="register" element={<ReigsterMain />} />
                </Route>
                <Route path="*" element={<PrivateRoute element={<MainRoute />} />} />
                {/* <Route path="*" element={<MainRoute />} /> */}
                {/* <Route path="*" element={<Navigate to="/account/login" />}></Route> */}
            </Routes>
        </BrowserRouter>
    )
}

const MainRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeBase />}>
                <Route path="matter" element={<Matter />}>
                    <Route path="importance" element={<Importance />} />
                    <Route path="schedule" element={<Schedule />} />
                    <Route path="checkList" element={<CheckList />} />
                </Route>
                <Route path="/plan" element={<Plan />}>
                    <Route path="myMonth" element={<MyMonth />} />
                    <Route path="myWeek" element={<MyWeek />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppWithRouter;