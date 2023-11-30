import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";
import moment from "moment";

const HostNotification = () => {
  const { id } = useParams();

  const [getHostNotification, setGetHostNotification] = useState([]);

  useEffect(() => {
    fetchUserNotification();
  }, []);

  const fetchUserNotification = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.GETHOSTNOTIFICATION,
      "POST",
      { id: id }
    )
      .then((res) => {
        console.log(res);
        setGetHostNotification(res.result1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getNotification = (notification) => {
    switch (notification?.statusType) {
      case "follow": {
        return notification?.followstatus;
      }
      case "profileLike": {
        return notification?.profileLikeStatus;
      }
      case "postlike": {
        return notification?.postLikeStatus;
      }
      case "sendGift": {
        return notification?.postGiftSend;
      }
      default: {
        return notification?.followstatus;
      }
    }
  };

  return (
    <div className="user__notification__container">
      <table className="user__notification__table">
        <thead>
          <th className="user__notification__header">S.No</th>
          <th className="user__notification__header">Title</th>
          <th className="user__notification__header">Body</th>
          <th className="user__notification__header">Date&Time</th>
        </thead>
        <tbody>
          {getHostNotification.map((data, index) => {
            return (
              <tr>
                <td className="user__notification__data">{index + 1}</td>
                <td className="user__notification__data">
                  {getNotification(data).title}
                </td>
                <td className="user__notification__data">
                  {getNotification(data).body}
                </td>
                <td className="user__notification__data">
                  {moment(getNotification(data).followTime).format(
                    "DD/MM/YYYY ,LT"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HostNotification;
