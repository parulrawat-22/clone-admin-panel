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

const WarnedHostTable = () => {
  const [warnedHostList, setWarnedHostList] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = useState("");

  const handleDeleteAlert = () => {
    setShowDeleteAlert(true);
  };

  const handleDeleteAlertClose = () => {
    setShowDeleteAlert(false);
  };

  useEffect(() => {
    getWarnedHost();
  }, []);

  const getWarnedHost = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.WARNEDHOST,
      "POST",
      searchParams.get("id") ? { hostId: searchParams.get("id") } : {}
    )
      .then((res) => {
        setWarnedHostList(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnClickAlert = (id) => {
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
        getWarnedHost();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="warned__host__container">
      {searchParams.get("id") ? (
        <table className="warned__host__table">
          <thead>
            <th className="warned__host__header">S.No.</th>
            <th className="warned__host__header">Title</th>
            <th className="warned__host__header">Description</th>
            <th className="warned__host__header">Created At</th>
            <th className="warned__host__header">Action</th>
          </thead>
          <tbody>
            {warnedHostList.map((data, index) => {
              return (
                <tr>
                  <td className="warned__host__data">{index + 1}</td>
                  <td className="warned__host__data">{data?.title}</td>
                  <td className="warned__host__data">{data?.body}</td>
                  <td className="warned__host__data">
                    {moment(data?.createdAt).format("DD/MM/YYYY , LT")}
                  </td>
                  <td className="warned__host__data">
                    <AiFillEdit className="warned__host__edit__icon" />
                    <AiFillDelete
                      onClick={() => {
                        handleOnClickAlert(data?._id);
                      }}
                      className="warned__host__delete__icon"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <table className="warned__host__table">
          <thead>
            <th className="warned__host__header">S.No.</th>
            <th className="warned__host__header">Host ID</th>
            <th className="warned__host__header">Host Name</th>
            <th className="warned__host__header">Title</th>
            <th className="warned__host__header">Description</th>
            <th className="warned__host__header">Action</th>
          </thead>
          <tbody>
            {warnedHostList.map((data, index) => {
              return (
                <tr>
                  <td className="warned__host__data">{index + 1}</td>
                  <td className="warned__host__data">{data?.hostId?._id}</td>
                  <td className="warned__host__data">{data?.hostId?.name}</td>
                  <td className="warned__host__data">{data?.title}</td>
                  <td className="warned__host__data">{data?.body}</td>
                  <td className="warned__host__data warned__host__icon">
                    <AiFillEdit className="warned__host__edit__icon" />
                    <AiFillDelete
                      onClick={() => {
                        handleOnClickAlert(data?._id);
                      }}
                      className="warned__host__delete__icon"
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

export default WarnedHostTable;
