import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useLoader } from "../../../base/Context/loaderProvider";

const HostNotification = () => {
  const { id } = useParams();

  const loader = useLoader();

  const [getHostNotification, setGetHostNotification] = useState([]);

  useEffect(() => {
    fetchUserNotification();
  }, []);

  const fetchUserNotification = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.GETHOSTNOTIFICATION,
      "POST",
      { id: id }
    )
      .then((res) => {
        loader.showLoader(false);
        console.log(res);
        setGetHostNotification(res.result1);
      })
      .catch((err) => {
        loader.showLoader(false);
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
    <div className="host__notification__container">
      <table className="host__notification__table">
        <thead>
          <th className="host__notification__header">S.No</th>
          <th className="host__notification__header">Title</th>
          <th className="host__notification__header">Body</th>
          <th className="host__notification__header">Date&Time</th>
        </thead>
        <tbody>
          {getHostNotification.map((data, index) => {
            return (
              <tr>
                <td className="host__notification__data">{index + 1}</td>
                <td className="host__notification__data">
                  {getNotification(data).title}
                </td>
                <td className="host__notification__data">
                  {getNotification(data).body}
                </td>
                <td className="host__notification__data">
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
