import Card from "../../components/Card";
import Layout from "../../components/Layout";
import Notification from "../../components/Notification";
import { useEffect, useState } from "react";
import { FaUsers, FaUsersSlash } from "react-icons/fa";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import { NetworkConfiguration } from "../../network/NetworkConfiguration";

import "./style.css";
import DashboardChart from "../../components/DashboardChart";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SecondaryButton from "../../components/library/SecondaryButton";
import { useLoader } from "../../base/Context/loaderProvider";
import SearchInput from "../../components/SearchInput";
import { FiSearch } from "react-icons/fi";
import { useApi } from "../../base/Context/apiProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSidebar } from "../../base/Context/sidebarProvider";

const Dashboard = () => {
  const loader = useLoader();
  const navigate = useNavigate();

  // let adminOnlineUser = 0;
  const [adminOnlineUser, setAdminOnlineUser] = useState(0);
  const [adminOfflineHost, setAdminOfflineHost] = useState(0);
  const [adminOnlineHost, setAdminOnlineHost] = useState(0);
  const [adminOfflineUser, setAdminOfflineUser] = useState(0);
  const [hostEarning, setHostEarning] = useState([]);
  const [userPurchase, setUserPurchase] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [endDate1, setEndDate1] = useState("");
  const [year, setYear] = useState(false);
  const [month, setMonth] = useState(false);
  const [week, setWeek] = useState(false);
  const [checkEndDate, setCheckEndDate] = useState(true);
  const [checkStartDate, setCheckStartDate] = useState(true);
  const apiProvider = useApi();
  const sidebarProvider = useSidebar();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams && searchParams.get("appType") === "catchwoo") {
      sessionStorage.setItem("selectedType", "catchwoo");
      sidebarProvider.setSelectedType("catchwoo");
    } else {
      sessionStorage.removeItem("selectedType");
      sidebarProvider.setSelectedType("");
    }
  }, [searchParams]);

  useEffect(() => {
    handleOnlineUser();
    handleOfflineHost();
    handleOnlineHost();
    handleOfflineUser();
    handleUserPurchase();
    handleHostEarning();
  }, [year, month, week, endDate, apiProvider?.apiUrl]);

  const handleOnlineUser = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.ONLINEUSER,
      "GET"
    )
      .then((res) => {
        loader.showLoader(false);
        setAdminOnlineUser(res.result);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err, "err========");
      });
  };

  const handleOfflineHost = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.OFFLINEHOST,
      "GET"
    )
      .then((res) => {
        loader.showLoader(false);
        setAdminOfflineHost(res.result);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err, "err========");
      });
  };

  const handleOnlineHost = () => {
    loader.showLoader(true);

    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.ONLINEHOST,
      "GET"
    )
      .then((res) => {
        setAdminOnlineHost(res.result);
        loader.showLoader(false);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err, "err========");
      });
  };

  const handleOfflineUser = () => {
    loader.showLoader(true);

    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.OFFLINEUSER,
      "GET"
    )
      .then((res) => {
        setAdminOfflineUser(res.result);
        loader.showLoader(false);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err, "err========");
      });
  };

  const handleUserPurchase = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.USERPURCHASE,
      "POST",
      {
        startDate1,
        endDate1,
        month,
        year,
        week,
      }
    )
      .then((res) => {
        setUserPurchase(res.totalPercentage.toFixed(2));
        loader.showLoader(false);
        console.log("12345678910", res);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  ////////////////////////////////
  //host Earnings

  const handleHostEarning = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.TOTALHOSTEARNING,
      "POST",
      {
        startDate,
        endDate,
        month,
        year,
        week,
      }
    )
      .then((res) => {
        console.log(res.totalPercentage);
        setHostEarning(res.totalPercentage.toFixed(2));
        loader.showLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleYear = () => {
    setYear(true);
    setMonth(false);
    setWeek(false);
  };

  const handleMonth = () => {
    setMonth(true);
    setYear(false);
    setWeek(false);
  };

  const handleWeek = () => {
    setMonth(false);
    setYear(false);
    setWeek(true);
  };

  const searchIcon = () => {
    return <FiSearch />;
  };

  const handleStartDate = (e) => {
    setCheckStartDate(false);
    setStartDate(e.target.value);
  };

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  };

  console.log("startdate", startDate);
  console.log("enddate", endDate);

  const handleStartDate2 = (e) => {
    setCheckEndDate(false);
    setStartDate1(e.target.value);
  };

  const handleEndDate2 = (e) => {
    setEndDate1(e.target.value);
  };

  return (
    <Layout>
      <div className="dashboard__container">
        <div className="dashboard__search__btn">
          <SearchInput placeholder="Search" icon={searchIcon()} />
        </div>
        <div>
          <div className="dashboard__cards_info">
            <Card
              name="Active User"
              icon={<FaUsers />}
              number={adminOnlineUser}
              onClick={() => {
                navigate("/activeuser");
              }}
            />
            <Card
              name="Inactive User"
              icon={<FaUsersSlash />}
              number={adminOfflineUser}
              onClick={() => {
                navigate("/inactiveuser");
              }}
            />
            <Card
              name="Active Host"
              icon={<FaUsers />}
              number={adminOnlineHost}
              onClick={() => {
                navigate("/activehost");
              }}
            />
            <Card
              name="Inactive Host"
              icon={<FaUsersSlash />}
              number={adminOfflineHost}
              onClick={() => {
                navigate("/inactivehost");
              }}
            />
          </div>
          <div className="dashboard__graphs__loaders">
            <div className="dashboard__graph">
              <DashboardChart />
            </div>

            <div>
              <div className="dashboard_filter_btn_row">
                <SecondaryButton onClick={handleYear} text="Year" />
                <SecondaryButton onClick={handleMonth} text="Month" />
                <SecondaryButton onClick={handleWeek} text="Week" />
              </div>
              <div>
                <div className="dashboard__loader">
                  <h3 className="dashboard__loader__heading">Host Revenue</h3>
                  <div className="dashboard__input__flex">
                    <input
                      value={startDate}
                      onChange={handleStartDate}
                      className="dashboard__input"
                      type="date"
                    />
                    <input
                      value={endDate}
                      onChange={handleEndDate}
                      className="dashboard__input"
                      type="date"
                      disabled={checkStartDate}
                    />
                  </div>

                  <CircularProgressbar
                    className="dashboard__host__revenue"
                    styles={{
                      path: {
                        stroke: `	rgba(242, 0, 148, ${50 / 100})`,
                      },
                    }}
                    value={hostEarning}
                    text={`${hostEarning}%`}
                  />
                </div>
                <div className="dashboard__loader_2">
                  <h3 className="dashboard__loader__heading">User Purchase</h3>
                  <div className="dashboard__input__flex">
                    <input
                      value={startDate1}
                      onChange={handleStartDate2}
                      className="dashboard__input"
                      type="date"
                    />
                    <input
                      value={endDate1}
                      onChange={handleEndDate2}
                      className="dashboard__input"
                      type="date"
                      disabled={checkEndDate}
                    />
                  </div>

                  <CircularProgressbar
                    className="dashboard__host__revenue"
                    styles={{
                      path: {
                        stroke: `rgba(242, 0, 148, ${50 / 100})`,
                      },
                    }}
                    value={userPurchase}
                    text={`${userPurchase}%`}
                  />
                </div>
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
