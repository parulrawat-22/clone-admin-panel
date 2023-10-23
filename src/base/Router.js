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
import Bucket from "../pages/Bucket";
import UserTable from "../components/Table/UserRequestTable";
import UserRequest from "../pages/UserRequest";
import Feedback from "../pages/Feedback";
import Moments from "../pages/Moments";
import Gifts from "../pages/Gift";
import Recharge from "../pages/Recharge";
import AcceptedUser from "../pages/AcceptedUser";

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
        <Route path="/bucket" element={<Bucket />} />
        <Route path="/userrequest" element={<UserRequest />} />
        <Route path="/acceptedusers" element={<AcceptedUser />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/gifts" element={<Gifts />} />
        <Route path="/recharge" element={<Recharge />} />
        <Route path="/moment" element={<Moments />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
