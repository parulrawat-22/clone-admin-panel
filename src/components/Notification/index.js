import { FiSearch } from "react-icons/fi";
import NotificationCard from "./NotificationCard";
import "./style.css";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";
import { useEffect, useState } from "react";

const Notification = () => {
  const [notificationData, setNotificationData] = useState([]);

  const notificationSearchIcon = () => {
    return <FiSearch />;
  };

  useEffect(() => {
    fetchNotificationData();
  }, []);

  const fetchNotificationData = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.DASHBOARDNOTIFICATION,
      "GET"
    )
      .then((res) => {
        setNotificationData(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h2 className="notification__heading">Recent Notifications</h2>
      <div className="notification__search_icon_bar">
        <i>{notificationSearchIcon()}</i>
        <input
          className="notification__search"
          placeholder="search connections"
        ></input>
      </div>
      {notificationData.map((data) => {
        return (
          <div>
            <NotificationCard
              name={data?.title}
              message={data?.body}
              feedback={data?.notificationType}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Notification;
