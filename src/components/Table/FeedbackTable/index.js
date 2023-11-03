import { BsFillEyeFill } from "react-icons/bs";
import "./style.css";
import { useEffect, useState } from "react";
import baseUrl from "../../../baseUrl";
import axios from "axios";
import moment from "moment";
import AlertPopUp from "../../AlertPopUp";
import { FaLess } from "react-icons/fa";

const FeedbackUserTable = () => {
  const [feedback, setFeedback] = useState([]);
  const [showRevertAlert, setShowRevertAlert] = useState(false);
  const [showImageAlert, setShowImageAlert] = useState(false);
  const [id, setId] = useState("");

  const handleShowImage = () => {
    setShowImageAlert(true);
  };

  useEffect(() => {
    getAllUsersFeedback();
  }, []);

  const getAllUsersFeedback = () => {
    axios
      .get(
        baseUrl + "admin/getAdminUserFeedback",
        {
          id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setFeedback(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFeedbackRevert = (id) => {
    setShowRevertAlert(true);
    setId(id);
  };

  const handleFeedbackRevertClose = () => {
    setShowRevertAlert(false);
  };

  return (
    <div className="feedback__container">
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
                <td className="feedback__table__data">{data._id}</td>
                <td className="feedback__table__data"> {data.userId.name}</td>
                <td className="feedback__table__data"> {data.feedbackType}</td>
                <td className="feedback__table__data"> {data.comment}</td>
                <td className="feedback__table__data">
                  <BsFillEyeFill onClick={handleShowImage} />
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
      <AlertPopUp
        open={showRevertAlert}
        handleOpen={handleFeedbackRevert}
        handleClose={handleFeedbackRevertClose}
        submitText="Submit"
        cancelText="Cancel"
        onCancelClick={handleFeedbackRevertClose}
        rejectedReason={true}
      />
    </div>
  );
};

export default FeedbackUserTable;
