import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "./style.css";
import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import AlertPopUp from "../../AlertPopUp";
import { useSearchParams } from "react-router-dom";
import moment from "moment";

const WarnedUserTable = () => {
  const [warnedUserList, setWarnedUserList] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [id, setId] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleDeleteAlert = () => {
    setShowDeleteAlert(true);
  };

  const handleDeleteAlertClose = () => {
    setShowDeleteAlert(false);
  };

  useEffect(() => {
    getWarnedUser();
  }, []);

  const getWarnedUser = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.WARNEDUSER,
      "POST",
      searchParams.get("id") ? { userId: searchParams.get("id") } : {}
    )
      .then((res) => {
        setWarnedUserList(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAlertDelete = (id) => {
    setShowDeleteAlert(true);
    setId(id);
  };

  const handleDelete = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.DELETEWARNING + `/${id}`,
      "DELETE"
    )
      .then((res) => {
        setShowDeleteAlert(false);
        getWarnedUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="warned__user__container">
      {searchParams.get("id") ? (
        <table className="warned__user__table">
          <thead>
            <th className="warned__user__header">S.No.</th>
            <th className="warned__user__header">Title</th>
            <th className="warned__user__header">Description</th>
            <th className="warned__user__header">Created At</th>
            <th className="warned__user__header">Action</th>
          </thead>
          <tbody>
            {warnedUserList.map((data, index) => {
              return (
                <tr>
                  <td className="warned__user__data">{index + 1}</td>
                  <td className="warned__user__data">{data?.title}</td>
                  <td className="warned__user__data">{data?.body}</td>
                  <td className="warned__user__data">
                    {moment(data?.createdAt).format("DD/MM/YYYY, LT")}
                  </td>
                  <td className="warned__user__data">
                    <AiFillEdit className="warned__user__edit__icon" />
                    <AiFillDelete
                      onClick={() => {
                        handleAlertDelete(data?._id);
                      }}
                      className="warned__user__delete__icon"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <table className="warned__user__table">
          <thead>
            <th className="warned__user__header">S.No.</th>
            <th className="warned__user__header">User ID</th>
            <th className="warned__user__header">User Name</th>
            <th className="warned__user__header">Title</th>
            <th className="warned__user__header">Description</th>
            <th className="warned__user__header">Created At</th>
            <th className="warned__user__header">Action</th>
          </thead>
          <tbody>
            {warnedUserList.map((data, index) => {
              return (
                <tr>
                  <td className="warned__user__data">{index + 1}</td>
                  <td className="warned__user__data">{data?._id}</td>
                  <td className="warned__user__data">{data?.userId?.name}</td>
                  <td className="warned__user__data">{data?.title}</td>
                  <td className="warned__user__data">{data?.body}</td>
                  <td className="warned__user__data">
                    {moment(data?.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="warned__user__data">
                    <AiFillEdit className="warned__user__edit__icon" />
                    <AiFillDelete
                      onClick={() => {
                        handleAlertDelete(data?._id);
                      }}
                      className="warned__user__delete__icon"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <AlertPopUp
        open={showDeleteAlert}
        handleOpen={handleDeleteAlert}
        handleClose={handleDeleteAlertClose}
        header="Delete Alert"
        description="Are you sure you want to delete this warning?"
        submitText="Yes"
        cancelText="No"
        onSubmitClick={handleDelete}
        onCancelClick={handleDeleteAlertClose}
      />
    </div>
  );
};

export default WarnedUserTable;
