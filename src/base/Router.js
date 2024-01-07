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
import Report from "../pages/Report";
import SuspendedUsers from "../pages/SuspendedUsers";
import WarnedUsers from "../pages/WarnedUser";
import Leader from "../pages/Leader";
import Layout from "../components/Layout";
import UserFollowing from "../pages/Following";
import Coin from "../pages/Coin";
import UserCallHistory from "../components/Table/CallHistoryTable";
import PaymentHistory from "../pages/PaymentHistory";
import TopGrowing from "../pages/TopGrowing";
import TopTalentTable from "../components/Table/TopTalentTable";
import Sticker from "../pages/Sticker";
import Notification from "../pages/Notification";
import UserManagementOption from "../components/pages/userManagement/UserManagementOption";
import HostManagementOption from "../components/pages/hostManagement/HostManagementOption";
import EditProfile from "../pages/EditProfile";
import Earnings from "../pages/Earnings";
import SendNotification from "../pages/SendNotification";
import Interest from "../pages/Interest";
import SubAdminList from "../pages/subAdmin/list";
import AddSubAdmin from "../pages/subAdmin/add";
import EditSubAdmin from "../pages/subAdmin/edit";
import Flower from "../pages/Flower";
import SuspiciousData from "../pages/SuspiciousData";
import MainCallHistory from "../pages/MainCallHistory";
import ActiveUser from "../pages/ActiveUser";
import InactiveHost from "../pages/InactiveHost";
import InactiveUser from "../pages/InactiveUser";
import ActiveHost from "../pages/ActiveHost";
import AdminBlockList from "../pages/AdminBlockList";
import Snapshots from "../pages/Snapshots";
// import SubAdmin from "../pages/SubAdmin";

// import Coin from "../pages/Coin";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
      <Route path="/enterotp" element={<EnterOtp />}></Route>
      <Route path="/newpassword/:email" element={<NewPassword />}></Route>
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      ></Route>
      <Route
        path="/banner"
        element={
          <Layout>
            <Banner />
          </Layout>
        }
      />
      <Route
        path="/usermanagement/:id"
        element={
          <Layout>
            <UserManagement />
          </Layout>
        }
      />
      <Route
        path="/usermanagement/:selectedOption/:id"
        element={
          <Layout>
            <UserManagementOption />
          </Layout>
        }
      />
      <Route
        path="/bucket"
        element={
          <Layout>
            <Bucket />
          </Layout>
        }
      />
      <Route
        path="/report"
        element={
          <Layout>
            <Report />
          </Layout>
        }
      />
      <Route path={`/allusers`} element={<UserRequest />} />
      <Route
        path="/userfollowing"
        element={
          <Layout>
            <UserFollowing />
          </Layout>
        }
      />
      <Route
        path="/hostmanagement/:id"
        element={
          <Layout>
            <HostManagement />
          </Layout>
        }
      />
      <Route
        path="/hostmanagement/:selectedOption/:id"
        element={
          <Layout>
            <HostManagementOption />
          </Layout>
        }
      />
      <Route
        path="/acceptedhost"
        element={
          <Layout>
            <AcceptedHost />
          </Layout>
        }
      />
      <Route
        path="/rejectedhost"
        element={
          <Layout>
            <RejectedHost />
          </Layout>
        }
      />
      <Route
        path="/hostrequest"
        element={
          <Layout>
            <HostRequest />
          </Layout>
        }
      />
      <Route
        path="/warnedusers"
        element={
          <Layout>
            <WarnedUsers />
          </Layout>
        }
      />
      <Route
        path="/leader"
        element={
          <Layout>
            <Leader />
          </Layout>
        }
      />
      <Route
        path="/suspendusers"
        element={
          <Layout>
            <SuspendedUsers />
          </Layout>
        }
      />
      <Route
        path="/feedback"
        element={
          <Layout>
            <Feedback />
          </Layout>
        }
      />
      <Route
        path="/gift"
        element={
          <Layout>
            <Gifts />
          </Layout>
        }
      />
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
      <Route
        path="/snapshot"
        element={
          <Layout>
            <Snapshots />
          </Layout>
        }
      />
      <Route path="/recharge" element={<Recharge />} />
      <Route
        path="/moment"
        element={
          <Layout>
            <Moments />
          </Layout>
        }
      ></Route>
      <Route path="/paymenthistory" element={<PaymentHistory />} />
      <Route path="/usercallhistory" element={<UserCallHistory />} />
      <Route
        path="/topgrowing"
        element={
          <Layout>
            <TopGrowing />
          </Layout>
        }
      />

      <Route
        path="/suspicious"
        element={
          <Layout>
            <SuspiciousData />
          </Layout>
        }
      />

      <Route
        path="/allcallhistory"
        element={
          <Layout>
            <MainCallHistory />
          </Layout>
        }
      />

      <Route
        path="/adminblocklist"
        element={
          <Layout>
            <AdminBlockList />
          </Layout>
        }
      />

      <Route path="/toptalent" element={<TopTalentTable />} />
      <Route
        path="/notification"
        element={
          <Layout>
            <Notification />
          </Layout>
        }
      />
      <Route
        path="/editprofile"
        element={
          <Layout>
            <EditProfile />
          </Layout>
        }
      />
      <Route
        path="/earnings"
        element={
          <Layout>
            <Earnings />
          </Layout>
        }
      ></Route>
      <Route
        path="/sendnotification"
        element={
          <Layout>
            <SendNotification />
          </Layout>
        }
      ></Route>
      <Route
        path="/interest"
        element={
          <Layout>
            <Interest />
          </Layout>
        }
      ></Route>
      <Route
        path="/addSubAdmin"
        element={
          <Layout>
            <AddSubAdmin />
          </Layout>
        }
      ></Route>
      <Route
        path="/subAdmin"
        element={
          <Layout>
            <SubAdminList />
          </Layout>
        }
      ></Route>
      <Route
        path="/editSubAdmin"
        element={
          <Layout>
            <EditSubAdmin />
          </Layout>
        }
      ></Route>

      <Route
        path="/flower"
        element={
          <Layout>
            <Flower />
          </Layout>
        }
      ></Route>

      <Route
        path="/activeuser"
        element={
          <Layout>
            <ActiveUser />
          </Layout>
        }
      ></Route>

      <Route
        path="/inactiveuser"
        element={
          <Layout>
            <InactiveUser />
          </Layout>
        }
      ></Route>

      <Route
        path="/activehost"
        element={
          <Layout>
            <ActiveHost />
          </Layout>
        }
      ></Route>

      <Route
        path="/inactivehost"
        element={
          <Layout>
            <InactiveHost />
          </Layout>
        }
      ></Route>
    </Routes>
  );
};

export default Router;
