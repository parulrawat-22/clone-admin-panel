import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "./style.css";
import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";

const NotificationTable = () => {
  const [getNotification, setGetNotification] = useState([]);

  useEffect(() => {
    fetchNotification();
  }, []);

  const fetchNotification = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETNOTIFICATION, "GET")
      .then((res) => {
        setGetNotification(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="notification__table__container">
      <table className="notification__table__table">
        <thead>
          <th className="notification__table__header">S.No.</th>
          <th className="notification__table__header">User ID</th>
          <th className="notification__table__header">Name</th>
          <th className="notification__table__header">Title</th>
          <th className="notification__table__header">Message</th>
          <th className="notification__table__header">Action</th>
        </thead>
        <tbody>
          {getNotification.map((data, index) => {
            return (
              <tr>
                <td className="notification__table__data">{index + 1}</td>
                <td className="notification__table__data">{data?._id}</td>
                <td className="notification__table__data">{data?.name}</td>
                <td className="notification__table__data">{data?.title}</td>
                <td className="notification__table__data">{data?.body}</td>
                <td className="notification__table__data">
                  <AiFillEdit className="notification__table__edit__icon" />
                  <AiFillDelete className="notification__table__delete__icon" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationTable;
