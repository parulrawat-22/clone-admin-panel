import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "./style.css";
import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";
import AlertPopUp from "../../AlertPopUp";

const NotificationTable = () => {
  const [getNotification, setGetNotification] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState("");
  // const { id } = useParams();
  const [id, setId] = useState("");

  const handleDeleteNotification = (id) => {
    setShowDeleteAlert(true);
    setId(id);
  };

  const handleDeleteNotificationClose = () => {
    setShowDeleteAlert(false);
  };

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

  const handleNotification = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.DELETENOTIFICATION + `/${id}`,
      "DELETE"
    )
      .then((res) => {
        console.log(res);
        setShowDeleteAlert(false);
        fetchNotification();
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
                <td className="notification__table__data">{data?.title}</td>
                <td className="notification__table__data">{data?.body}</td>
                <td className="notification__table__data">
                  <AiFillEdit className="notification__table__edit__icon" />
                  <AiFillDelete
                    onClick={() => {
                      handleDeleteNotification(data?._id);
                    }}
                    className="notification__table__delete__icon"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <AlertPopUp
        open={showDeleteAlert}
        handleOpen={handleDeleteNotification}
        handleClose={handleDeleteNotificationClose}
        header="Delete Alert"
        description="Are you sure you want to delete this notification?"
        submitText="Yes"
        cancelText="No"
        onSubmitClick={handleNotification}
        onCancelClick={handleDeleteNotificationClose}
      />
    </div>
  );
};

export default NotificationTable;
