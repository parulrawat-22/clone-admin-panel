import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import EnterOtp from "../pages/EnterOtp";
import NewPassword from "../pages/NewPassword";
import Dashboard from "../pages/Dashboard";
import Banner from "../pages/Banner";
import UserManagement from "../pages/UserManagement";
import Bucket from "../pages/Bucket";
import UserRequest from "../pages/UserRequest";
import Feedback from "../pages/UserFeedback";
import Moments from "../pages/Moments";
import Gifts from "../pages/Gift";
import Recharge from "../pages/Recharge";
import HostManagement from "../pages/HostManagement";
import AcceptedHost from "../pages/AcceptedHost";
import HostRequest from "../pages/HostRequest";
import RejectedHost from "../pages/RejectedHost";
import UserFeedback from "../pages/UserFeedback";
import Report from "../pages/Report";
import SuspendedUsers from "../pages/SuspendedUsers";
import WarnedUsers from "../pages/WarnedUser";
import Leader from "../pages/Leader";
import EditUser from "../pages/EditUser";
import Layout from "../components/Layout";
import UserFollowing from "../pages/Following";
import UserSticker from "../pages/Sticker";
import Coin from "../pages/Coin";
import UserCallHistory from "../components/Table/CallHistoryTable";
import BlockList from "../pages/BlockList";
import PaymentHistory from "../pages/PaymentHistory";
import TopGrowing from "../pages/TopGrowing";
import TopTalentTable from "../components/Table/TopTalentTable";
import WeeklyTalentTable from "../components/Table/WeeklyTalentTable";
import Sticker from "../pages/Sticker";
// import Coin from "../pages/Coin";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/enterotp" element={<EnterOtp />}></Route>
        <Route path="/newpassword/:email" element={<NewPassword />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/banner" element={<Banner />} />
        <Route path="/usermanagement/:id" element={<UserManagement />} />
        <Route path="/bucket" element={<Bucket />} />
        <Route path="/report" element={<Report />} />
        <Route path="/allusers" element={<UserRequest />} />
        <Route
          path="/edituser"
          element={
            <Layout>
              <EditUser />{" "}
            </Layout>
          }
        />
        <Route
          path="/userfollowing"
          element={
            <Layout>
              <UserFollowing />
            </Layout>
          }
        />
        <Route path="/hostmanagement" element={<HostManagement />} />
        <Route
          path="/acceptedhost"
          element={
            <Layout>
              <AcceptedHost />
            </Layout>
          }
        />
        <Route path="/rejectedhost" element={<RejectedHost />} />
        <Route path="/hostrequest" element={<HostRequest />} />
        <Route path="/warnedusers" element={<WarnedUsers />} />
        <Route path="/leader" element={<Leader />} />
        <Route path="/suspendusers" element={<SuspendedUsers />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/gift" element={<Gifts />} />
        <Route
          path="sticker"
          element={
            <Layout>
              <Sticker />
            </Layout>
          }
        />
        <Route
          path="/coin"
          element={
            <Layout>
              <Coin />
            </Layout>
          }
        />
        <Route path="/recharge" element={<Recharge />} />
        <Route path="/moment" element={<Moments />}></Route>
        <Route path="/blockedHost" element={<BlockList />} />
        <Route path="/paymenthistory" element={<PaymentHistory />} />
        <Route path="/usercallhistory" element={<UserCallHistory />} />
        <Route path="/topgrowing" element={<TopGrowing />} />
        <Route path="/toptalent" element={<TopTalentTable />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
