import { useEffect, useState } from "react";
import "./style.css";
import baseUrl from "../../../baseUrl";
import axios from "axios";
import moment from "moment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import AlertPopUp from "../../AlertPopUp";
import { useNavigate } from "react-router-dom";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";

const RejectedHostTable = () => {
  let navigate = useNavigate();
  const [rejectedHost, setRejectedHost] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {
    getRejectedHost();
  }, []);

  const getRejectedHost = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.REJECTEDHOST, "POST", {})
      .then((res) => {
        setRejectedHost(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRejectedHostDelete = (id) => {
    console.log(id);
    setShowDeleteAlert(true);
    setId(id);
  };

  const handleRejectedHostDeleteClose = () => {
    setShowDeleteAlert(false);
  };

  const handleCancelRejectedHost = () => {
    setShowDeleteAlert(false);
    navigate("/rejectedhost");
  };

  const handleDeleteRejectedHost = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.DELETEHOST + `${id}`)
      .then((res) => {
        setShowDeleteAlert(false);
        getRejectedHost();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="rejected__host__container">
      <table className="rejected__host__table">
        <thead>
          <th className="rejected__host__header">S.No.</th>
          <th className="rejected__host__header">Host ID</th>
          <th className="rejected__host__header">Name</th>
          <th className="rejected__host__header">Date Of Birth</th>
          <th className="rejected__host__header">Email</th>
          <th className="rejected__host__header">Mobile Number</th>
          <th className="rejected__host__header">Rejected At</th>
          <th className="rejected__host__header">Rejected Reason</th>
          <th className="rejected__host__header">Details</th>
          <th className="rejected__host__header">Action</th>
        </thead>
        <tbody>
          {rejectedHost.map((data, index) => {
            return (
              <tr>
                <td className="rejected__host__data">{index + 1}</td>
                <td className="rejected__host__data">{data?._id}</td>
                <td className="rejected__host__data">{data?.name}</td>
                <td className="rejected__host__data">{data?.dateOfBirth}</td>
                <td className="rejected__host__data">{data?.email}</td>
                <td className="rejected__host__data">{data?.mobileNumber}</td>
                <td className="rejected__host__data">
                  {moment(data?.rejectedDate).format("DD/MM/YYYY LT")}
                </td>
                <td className="rejected__host__data">{data?.rejectedReason}</td>
                <td className="rejected__host__data">View</td>
                <td className="rejected__host__action rejected__host__data">
                  <AiFillEdit className="rejected__host__edit__icon" />
                  <AiFillDelete
                    className="rejected__host__delete__icon"
                    onClick={() => handleRejectedHostDelete(data._id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <AlertPopUp
        open={showDeleteAlert}
        handleOpen={handleRejectedHostDelete}
        handleClose={handleRejectedHostDeleteClose}
        header="Delete Alert"
        description="Are you sure you want to delete this rejected host?"
        submitText="Yes"
        cancelText="No"
        onSubmitClick={handleDeleteRejectedHost}
        onCancelClick={handleCancelRejectedHost}
      />
    </div>
  );
};

export default RejectedHostTable;
