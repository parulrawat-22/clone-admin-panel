import { FiSearch } from "react-icons/fi";
import NotificationCard from "./NotificationCard";
import "./style.css";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import { NetworkConfiguration } from "../../network/NetworkConfiguration";
import { useEffect, useState } from "react";
import { useApi } from "../../base/Context/apiProvider";

const Notification = () => {
  const [notificationData, setNotificationData] = useState([]);
  const apiProvider = useApi();

  const notificationSearchIcon = () => {
    return <FiSearch />;
  };

  useEffect(() => {
    fetchNotificationData();
  }, [apiProvider?.apiUrl]);

  const fetchNotificationData = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.DASHBOARDNOTIFICATION,
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
              statusType={data?.statusType}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Notification;
