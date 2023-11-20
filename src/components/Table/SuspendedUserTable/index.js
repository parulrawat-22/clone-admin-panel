import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "./style.css";
import { useEffect, useState } from "react";
import moment from "moment";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import AlertPopUp from "../../AlertPopUp";

const SuspendedUserTable = () => {
  const [suspendedUserList, setSuspendedUserList] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [id, setId] = useState("");

  const handleDeleteAlert = () => {
    setShowDeleteAlert(true);
  };

  const handleDeleteAlertClose = () => {
    setShowDeleteAlert(false);
  };

  const getSuspendedUserList = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.SUSPENDEDUSER, "GET")
      .then((res) => {
        setSuspendedUserList(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSuspendedUserList();
  }, []);

  const handleOnClickDelete = (id) => {
    setId(id);
    setShowDeleteAlert(true);
  };

  const handleAlertDelete = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.DELETESUSPENSION + `/${id}`,
      "DELETE"
    )
      .then((res) => {
        setShowDeleteAlert(false);
        getSuspendedUserList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="suspended__table__container">
      <table className="suspended__table">
        <thead>
          <th className="suspended__table__header">S.no</th>
          <th className="suspended__table__header">User ID</th>
          <th className="suspended__table__header">User Name</th>
          <th className="suspended__table__header">Suspended From</th>
          <th className="suspended__table__header">Suspended To</th>
          <th className="suspended__table__header">Action</th>
        </thead>
        <tbody>
          {suspendedUserList.map((data, index) => {
            return (
              <tr>
                <td className="suspended__table__data">{index + 1}</td>
                <td className="suspended__table__data">{data._id}</td>
                <td className="suspended__table__data">{data.userId.name}</td>
                <td className="suspended__table__data">
                  {moment(data.createdAt).format("DD/MM/YYYY, LT")}
                </td>
                <td className="suspended__table__data">
                  {moment(data.suspensionEndDate).format("DD/MM/YYYY, LT")}
                </td>
                <td className="suspended__table__data suspended__user__icons">
                  <AiFillEdit className="suspended__table__edit__icon" />
                  <AiFillDelete
                    onClick={() => {
                      handleOnClickDelete(data._id);
                    }}
                    className="suspended__table__delete__icon"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <AlertPopUp
        open={showDeleteAlert}
        handleOpen={handleDeleteAlert}
        handleClose={handleDeleteAlertClose}
        header="Delete Alert"
        description="Are you sure you want to delete this Suspended User?"
        submitText="Yes"
        cancelText="No"
        onSubmitClick={handleAlertDelete}
        onCancelClick={handleDeleteAlertClose}
      />
    </div>
  );
};

export default SuspendedUserTable;
