import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import EnterOtp from "../pages/EnterOtp";
import NewPassword from "../pages/NewPassword";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Banner from "../pages/Banner";
import UserManagement from "../pages/UserManagement";
import BannerList from "../pages/Banner/BannerList";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/enterotp" element={<EnterOtp />}></Route>
        <Route path="/newpassword/:email" element={<NewPassword />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/users" element={<Users />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/bannerlist" element={<BannerList />} />
        <Route path="/usermanagement" element={<UserManagement />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
