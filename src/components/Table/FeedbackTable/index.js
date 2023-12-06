// import { BsFillEyeFill } from "react-icons/bs";
import "./style.css";
import { useEffect, useState } from "react";
import moment from "moment";
import AlertPopUp from "../../AlertPopUp";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import ImagePopUpModal from "../../ImagePopUpModal";
import { useParams } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { useLoader } from "../../../base/Context/loaderProvider";

const FeedbackUserTable = () => {
  const { id } = useParams();

  const [feedback, setFeedback] = useState([]);
  const [showRevertAlert, setShowRevertAlert] = useState(false);
  const [showImageAlert, setShowImageAlert] = useState(false);
  const [img, setImg] = useState("");
  const [getId, setGetId] = useState("");
  const [replyFeedback, setReplyFeedback] = useState("");

  const loader = useLoader();

  const handleShowImage = (img) => {
    setShowImageAlert(true);
    setImg(img);
  };

  const handleShowImageClose = () => {
    setShowImageAlert(false);
  };

  useEffect(() => {
    getAllUsersFeedback();
  }, []);

  const getAllUsersFeedback = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.GETUSERFEEDBACK,
      "POST",
      id ? { userId: id } : {}
    )
      .then((res) => {
        loader.showLoader(false);
        setFeedback(res.result);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  const handleFeedbackReply = () => {
    loader.showLoader(true);
    fetchDataFromAPI(API_URL + NetworkConfiguration.SENDREPLYUSER, "PUT", {
      id: getId,
      replyFeedback: replyFeedback,
    })
      .then((res) => {
        loader.showLoader(false);
        setShowRevertAlert(false);
        getAllUsersFeedback();
      })
      .catch((err) => {
        loader.showLoader(false);

        console.log(err);
      });
  };

  const handleFeedbackRevert = (id) => {
    setShowRevertAlert(false);
    setGetId(id);
  };

  const handleFeedbackRevertClose = () => {
    setShowRevertAlert(false);
  };

  return (
    <div className="feedback__container">
      <table className="feedback__table__container">
        <thead>
          <th className="feedback__table__heading">S.No.</th>
          {id && (
            <>
              <th className="feedback__table__heading">User ID</th>
              <th className="feedback__table__heading">User Name</th>
            </>
          )}
          <th className="feedback__table__heading">Title</th>
          <th className="feedback__table__heading">Description</th>
          <th className="feedback__table__heading">Image/Video</th>
          <th className="feedback__table__heading">Created At</th>
          <th className="feedback__table__heading">Revert Back</th>
        </thead>
        <tbody>
          {feedback.map((data, index) => {
            return (
              <tr>
                <td className="feedback__table__data"> {index + 1}</td>
                {id && (
                  <>
                    <td className="feedback__table__data">{data?._id}</td>
                    <td className="feedback__table__data">
                      {" "}
                      {data?.userId?.name}
                    </td>
                  </>
                )}
                <td className="feedback__table__data">{data?.feedbackType}</td>
                <td className="feedback__table__data"> {data?.comment}</td>
                <td className="feedback__table__data">
                  <AiFillEye
                    onClick={() => {
                      handleShowImage(data?.feedbackImage);
                    }}
                    className="feedback__table__eye__icon"
                  />
                </td>
                <td className="feedback__table__data">
                  {moment(data.createdAt).format("DD/MM/YYYY LT")}
                </td>
                {data?.replyFeedback ? (
                  <td className="feedback__table__data">
                    {data?.replyFeedback}
                  </td>
                ) : (
                  <td
                    onClick={() => handleFeedbackRevert(data?._id)}
                    className="feedback__table__data"
                  >
                    Reply{" "}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <AlertPopUp
        open={showRevertAlert}
        handleOpen={handleFeedbackRevert}
        handleClose={handleFeedbackRevertClose}
        submitText="Submit"
        cancelText="Cancel"
        onSubmitClick={handleFeedbackReply}
        onCancelClick={handleFeedbackRevertClose}
        handleReasonChange={(e) => {
          setReplyFeedback(e.target.value);
        }}
        rejectedReason={true}
      />
      <ImagePopUpModal
        open={showImageAlert}
        handleClose={handleShowImageClose}
        img={img}
      />
    </div>
  );
};

export default FeedbackUserTable;
