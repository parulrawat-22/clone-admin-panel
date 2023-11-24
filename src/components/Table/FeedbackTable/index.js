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

const FeedbackUserTable = () => {
  const { id } = useParams();

  const [feedback, setFeedback] = useState([]);
  const [showRevertAlert, setShowRevertAlert] = useState(false);
  const [showImageAlert, setShowImageAlert] = useState(false);
  const [img, setImg] = useState("");

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
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.GETUSERFEEDBACK,
      "POST",
      id ? { userId: id } : {}
    )
      .then((res) => {
        setFeedback(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFeedbackRevert = () => {
    setShowRevertAlert(true);
  };

  const handleFeedbackRevertClose = () => {
    setShowRevertAlert(false);
  };

  return (
    <div className="feedback__container">
      {id ? (
        <table className="feedback__table__container">
          <thead>
            <th className="feedback__table__heading">S.No.</th>
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
                  <td className="feedback__table__data">
                    {" "}
                    {data?.feedbackType}
                  </td>
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
                  <td
                    onClick={handleFeedbackRevert}
                    className="feedback__table__data"
                  >
                    Reply
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <table className="feedback__table__container">
          <thead>
            <th className="feedback__table__heading">S.No.</th>
            <th className="feedback__table__heading">User ID</th>
            <th className="feedback__table__heading">User Name</th>
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
                  <td className="feedback__table__data">{data?._id}</td>
                  <td className="feedback__table__data">
                    {" "}
                    {data?.userId?.name}
                  </td>
                  <td className="feedback__table__data">
                    {data?.feedbackType}
                  </td>
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
                  <td
                    onClick={handleFeedbackRevert}
                    className="feedback__table__data"
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
        handleOpen={handleFeedbackRevert}
        handleClose={handleFeedbackRevertClose}
        submitText="Submit"
        cancelText="Cancel"
        onCancelClick={handleFeedbackRevertClose}
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
