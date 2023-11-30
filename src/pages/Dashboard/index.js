import Card from "../../components/Card";
import { SlUserFemale } from "react-icons/sl";
import Layout from "../../components/Layout";
import Notification from "../../components/Notification";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../baseUrl";
import { FaUsers, FaUsersSlash } from "react-icons/fa";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";

const Dashboard = () => {
  useEffect(() => {
    handleOnlineUser();
    handleOfflineHost();
    handleOnlineHost();
    handleOfflineUser();
    handleHostEarning();
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
        console.log(res, "res========");
        setAdminOnlineUser(res.data.result);
      })
      .catch((err) => {
        console.log(err, "err========");
      });
  };

  const handleOfflineHost = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.OFFLINEHOST, "GET")
      .then((res) => {
        console.log(res, "res========");
        setAdminOfflineHost(res.data.result);
      })
      .catch((err) => {
        console.log(err, "err========");
      });
  };

  const handleOnlineHost = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.ONLINEHOST, "GET")
      .then((res) => {
        console.log(res, "res========");
        setAdminOnlineHost(res.data.result);
      })
      .catch((err) => {
        console.log(err, "err========");
      });
  };

  const handleOfflineUser = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.OFFLINEUSER, "GET")
      .then((res) => {
        console.log(res, "res========");
        setAdminOfflineUser(res.data.result);
      })
      .catch((err) => {
        console.log(err, "err========");
      });
  };
  const handleHostEarning = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.HOSTEARNING, "POST", {
      startDate: "2023-11-27",
      endDate: "2023-11-28",
    })
      .then((res) => {
        console.log(res, "resjsjsjs========");
        //setAdminOfflineUser(res.data.result);
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
            <div className="dashboard__graph"></div>
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
