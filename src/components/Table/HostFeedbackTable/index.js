import { useEffect, useState } from "react";
import "./style.css";
import { BsFillEyeFill } from "react-icons/bs";
import moment from "moment";
import baseUrl from "../../../baseUrl";
import axios from "axios";
import AlertPopUp from "../../AlertPopUp";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";

const HostFeedbackTable = () => {
  const [hostFeedback, setHostFeeback] = useState([]);
  const [id, setId] = useState("");
  const [showRevertAlert, setShowRevertAlert] = useState(false);

  const handleHostFeedbackRevert = () => {
    setShowRevertAlert(true);
  };

  const handleHostFeedbackRevertClose = () => {
    setShowRevertAlert(false);
  };

  useEffect(() => {
    getAllHostsFeedback();
  }, []);

  const getAllHostsFeedback = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETHOSTFEEDBACK, "GET")
      .then((res) => {
        setHostFeeback(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="host__feedback__container">
      <table className="host__feedback__table__container">
        <thead>
          <th className="host__feedback__table__heading">S.No.</th>
          <th className="host__feedback__table__heading">Host ID</th>
          <th className="host__feedback__table__heading">Host Name</th>
          <th className="host__feedback__table__heading">Title</th>
          <th className="host__feedback__table__heading">Description</th>
          <th className="host__feedback__table__heading">Image/Video</th>
          <th className="host__feedback__table__heading">Created At</th>
          <th className="host__feedback__table__heading">Revert Back</th>
        </thead>
        <tbody>
          {hostFeedback.map((data, index) => {
            return (
              <tr>
                <td className="host__feedback__table__data"> {index + 1}</td>
                <td className="host__feedback__table__data">{data._id}</td>
                <td className="host__feedback__table__data">
                  {data?.hostId?.name}
                </td>
                <td className="host__feedback__table__data">
                  {data.feedbackType}
                </td>
                <td className="host__feedback__table__data"> {data.comment}</td>
                <td className="host__feedback__table__data">
                  <BsFillEyeFill />
                </td>
                <td className="host__feedback__table__data">
                  {moment(data.createdAt).format("DD/MM/YYYY LT")}
                </td>
                <td
                  onClick={handleHostFeedbackRevert}
                  className="host__feedback__table__data "
                >
                  Reply
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <AlertPopUp
        open={showRevertAlert}
        handleOpen={handleHostFeedbackRevert}
        handleClose={handleHostFeedbackRevertClose}
        rejectedReason={true}
        submitText="Submit"
        onCancelClick={handleHostFeedbackRevertClose}
        cancelText="Cancel"
      />
    </div>
  );
};

export default HostFeedbackTable;
