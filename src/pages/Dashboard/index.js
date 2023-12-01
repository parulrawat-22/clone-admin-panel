import Card from "../../components/Card";
import Layout from "../../components/Layout";
import Notification from "../../components/Notification";
import { useEffect, useState } from "react";
import { FaUsers, FaUsersSlash } from "react-icons/fa";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";

import "./style.css";
import DashboardChart from "../../components/DashboardChart";

const Dashboard = () => {
  useEffect(() => {
    handleOnlineUser();
    handleOfflineHost();
    handleOnlineHost();
    handleOfflineUser();
    handleUserPurchase();
  }, []);

  // let adminOnlineUser = 0;
  const [adminOnlineUser, setAdminOnlineUser] = useState(0);
  const [adminOfflineHost, setAdminOfflineHost] = useState(0);
  const [adminOnlineHost, setAdminOnlineHost] = useState(0);
  const [adminOfflineUser, setAdminOfflineUser] = useState(0);

  const handleOnlineUser = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.ONLINEUSER, "GET")
      .then((res) => {
        setAdminOnlineUser(res.data.result);
      })
      .catch((err) => {
        console.log(err, "err========");
      });
  };

  const handleOfflineHost = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.OFFLINEHOST, "GET")
      .then((res) => {
        setAdminOfflineHost(res.data.result);
      })
      .catch((err) => {
        console.log(err, "err========");
      });
  };

  const handleOnlineHost = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.ONLINEHOST, "GET")
      .then((res) => {
        setAdminOnlineHost(res.data.result);
      })
      .catch((err) => {
        console.log(err, "err========");
      });
  };

  const handleOfflineUser = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.OFFLINEUSER, "GET")
      .then((res) => {
        setAdminOfflineUser(res.data.result);
      })
      .catch((err) => {
        console.log(err, "err========");
      });
  };

  const handleUserPurchase = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.USERPURCHASE, "POST", {
      startDate: "2023-11-27",
      endDate: "2023-11-28",
    })
      .then((res) => {
        console.log("12345678910", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ////////////////////////////////
  //host Earnings

  return (
    <Layout>
      <div className="dashboard__container">
        <div>
          <div className="dashboard__cards_info">
            <Card
              name="Active User"
              icon={<FaUsers />}
              number={adminOnlineUser}
            />
            <Card
              name="Inactive User"
              icon={<FaUsersSlash />}
              number={adminOfflineUser}
            />
            <Card
              name="Active Host"
              icon={<FaUsers />}
              number={adminOnlineHost}
            />
            <Card
              name="Inactive Host"
              icon={<FaUsersSlash />}
              number={adminOfflineHost}
            />
          </div>
          <div className="dashboard__graphs__loaders">
            <div className="dashboard__graph">
              <DashboardChart />
            </div>

            <div>
              <div className="dashboard__loader">
                <h3 className="dashboard__loader__heading">Host Revenue</h3>
                <div class="progress-bar"></div>
              </div>
              <div className="dashboard__loader_2">
                <h3 className="dashboard__loader__heading">User Purchase</h3>
                <div class="progress-bar"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard__notification">
          <Notification />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
