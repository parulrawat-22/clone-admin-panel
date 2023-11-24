import { useEffect, useState } from "react";
import "./style.css";
import moment from "moment";

import AlertPopUp from "../../AlertPopUp";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { AiFillEye } from "react-icons/ai";
import ImagePopUpModal from "../../ImagePopUpModal";
import { useParams } from "react-router-dom";

const HostFeedbackTable = () => {
  const [hostFeedback, setHostFeeback] = useState([]);
  const [showRevertAlert, setShowRevertAlert] = useState(false);
  const [showImageAlert, setShowImageAlert] = useState(false);
  const [img, setImg] = useState("");
  const { id } = useParams();

  const handleOnClickAlert = (img) => {
    setImg(img);
    setShowImageAlert(true);
  };

  const handleOnClickAlertClose = () => {
    setShowImageAlert(false);
  };

  const handleHostFeedbackRevert = () => {
    setShowRevertAlert(true);
  };

  const handleHostFeedbackRevertClose = () => {
    setShowRevertAlert(false);
  };

  useEffect(() => {
    console.log("Parul");
    getAllHostsFeedback();
  }, []);

  const getAllHostsFeedback = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.GETHOSTFEEDBACK,
      "POST",
      id ? { hostId: id } : {}
    )
      .then((res) => {
        setHostFeeback(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="host__feedback__container">
      {id ? (
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
                  <td className="host__feedback__table__data">
                    {" "}
                    {data.comment}
                  </td>
                  <td className="host__feedback__table__data host__table__icon">
                    <AiFillEye
                      onClick={() => {
                        handleOnClickAlert(data?.feedbackImage);
                      }}
                    />
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
      ) : (
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
                  <td className="host__feedback__table__data">
                    {" "}
                    {data.comment}
                  </td>
                  <td className="host__feedback__table__data">
                    <AiFillEye
                      onClick={() => {
                        handleOnClickAlert(data?.feedbackImage);
                      }}
                      className="host__feedback__table__eye__icon"
                    />
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
      )}

      <AlertPopUp
        open={showRevertAlert}
        handleOpen={handleHostFeedbackRevert}
        handleClose={handleHostFeedbackRevertClose}
        rejectedReason={true}
        submitText="Submit"
        onCancelClick={handleHostFeedbackRevertClose}
        cancelText="Cancel"
      />

      <ImagePopUpModal
        open={showImageAlert}
        handleClose={handleOnClickAlertClose}
        img={img}
      />
    </div>
  );
};

export default HostFeedbackTable;
