import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from '@/modules/Login';
import LoginMainBox from "@/modules/Login/components/LoginMainBox";
import ReigsterMain from "@/modules/Login/components/Register";
const AppWithRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/account" element={<Login />} >
                    <Route path="login" element={<LoginMainBox />} />
                    <Route path="register" element={<ReigsterMain />} />
                    <Route path="" element={<Navigate to="login" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppWithRouter;