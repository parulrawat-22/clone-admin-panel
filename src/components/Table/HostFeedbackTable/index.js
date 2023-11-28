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
  const [getId, setGetId] = useState("");
  const [replyFeedback, setReplyFeedback] = useState("");

  const handleOnClickAlert = (img) => {
    setImg(img);
    setShowImageAlert(true);
  };

  const handleOnClickAlertClose = () => {
    setShowImageAlert(false);
  };

  const handleHostFeedbackRevert = (id) => {
    setShowRevertAlert(true);
    setGetId(id);
  };

  const handleHostFeedbackRevertClose = () => {
    setShowRevertAlert(false);
  };

  useEffect(() => {
    getAllHostsFeedback();
  }, []);

  const handleReply = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.SENDREPLYHOST, "PUT", {
      id: getId,
      replyFeedback: replyFeedback,
    })
      .then((res) => {
        console.log(res);
        setShowRevertAlert(false);
        getAllHostsFeedback();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <table className="host__feedback__table__container">
        <thead>
          <th className="host__feedback__table__heading">S.No.</th>
          {!id && (
            <>
              <th className="host__feedback__table__heading">Host ID</th>
              <th className="host__feedback__table__heading">Host Name</th>
            </>
          )}
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
                {!id && (
                  <>
                    <td className="host__feedback__table__data">{data._id}</td>
                    <td className="host__feedback__table__data">
                      {data?.hostId?.name}
                    </td>
                  </>
                )}
                <td className="host__feedback__table__data">
                  {data.feedbackType}
                </td>
                <td className="host__feedback__table__data"> {data.comment}</td>
                <td className="host__feedback__table__data">
                  <AiFillEye
                    onClick={() => {
                      handleOnClickAlert(data?.feedbackImage);
                    }}
                    className="host__feedback__eye__icon"
                  />
                </td>
                <td className="host__feedback__table__data">
                  {moment(data.createdAt).format("DD/MM/YYYY LT")}
                </td>
                {data?.replyFeedback ? (
                  <td className="host__feedback__table__data host__feedback__view__btn">
                    {data?.replyFeedback}
                  </td>
                ) : (
                  <td
                    onClick={() => handleHostFeedbackRevert(data?._id)}
                    className="host__feedback__table__data host__feedback__view__btn"
                  >
                    Reply
                  </td>
                )}
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
        onSubmitClick={handleReply}
        onCancelClick={handleHostFeedbackRevertClose}
        cancelText="Cancel"
        handleReasonChange={(e) => setReplyFeedback(e.target.value)}
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
