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
import { FiSearch } from "react-icons/fi";
import SearchInput from "../../SearchInput";
import Pagination from "../../Pagination";
import Lottie from "react-lottie";
import noData from "../../../base/Animation/No Data Found.json";

const FeedbackUserTable = () => {
  const { id } = useParams();

  const [feedback, setFeedback] = useState([]);
  const [showRevertAlert, setShowRevertAlert] = useState(false);
  const [showImageAlert, setShowImageAlert] = useState(false);
  const [img, setImg] = useState("");
  const [getId, setGetId] = useState("");
  const [replyFeedback, setReplyFeedback] = useState("");
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");

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
  }, [value, page, perPage]);

  const getAllUsersFeedback = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.GETUSERFEEDBACK,
      "POST",
      id
        ? { userId: id }
        : {
            key: value,
            page,
            perPage,
          }
    )
      .then((res) => {
        loader.showLoader(false);
        setFeedback(res.result);
        setTotalCount(res.totalCount);
        setTotalPages(res.totalPages);
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
    setShowRevertAlert(true);
    setGetId(id);
  };

  const handleFeedbackRevertClose = () => {
    setShowRevertAlert(false);
  };

  const searchIcon = () => {
    return <FiSearch />;
  };

  const handleText = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="feedback__container">
      <div className="banner__search__btn">
        <SearchInput
          value={value}
          onChange={handleText}
          placeholder="Search"
          icon={searchIcon()}
        />
      </div>
      <div className="table_parent_box">
        <table className="feedback__table__container">
          <thead>
            <th className="feedback__table__heading">S.No.</th>
            {!id && (
              <>
                <th className="feedback__table__heading">User ID</th>
                <th className="feedback__table__heading">User Name</th>
              </>
            )}
            <th className="feedback__table__heading">Title</th>
            <th className="feedback__table__heading">Description</th>
            <th className="feedback__table__heading">Image/Video</th>
            <th className="feedback__table__heading">Contact Details </th>
            <th className="feedback__table__heading">Created At</th>
            <th className="feedback__table__heading">Revert Back</th>
          </thead>
          <tbody>
            {feedback.length > 0
              ? feedback.map((data, index) => {
                  return (
                    <tr>
                      <td className="feedback__table__data">
                        {" "}
                        {(page - 1) * perPage + index + 1}
                      </td>
                      {!id && (
                        <>
                          <td className="feedback__table__data">{data?._id}</td>
                          <td className="feedback__table__data">
                            {" "}
                            {data?.userId?.name}
                          </td>
                        </>
                      )}
                      <td className="feedback__table__data">
                        {data?.feedbackType}
                      </td>
                      <td className="feedback__table__data">
                        {" "}
                        {data?.comment}
                      </td>
                      <td className="feedback__table__data">
                        <AiFillEye
                          onClick={() => {
                            handleShowImage(data?.feedbackImage);
                          }}
                          className="feedback__table__eye__icon"
                        />
                      </td>
                      <td className="feedback__table__data">
                        {data?.contact || data?.email}
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
                          className="feedback__table__data feedback__table__reply"
                        >
                          Reply
                        </td>
                      )}
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>

      {feedback.length > 0 ? (
        <Pagination
          page={page}
          setPage={setPage}
          totalCount={totalCount}
          totalPages={totalPages}
          setPerPage={setPerPage}
          perPage={perPage}
          options={[5, 10, 15, 20]}
        />
      ) : (
        !loader.loaderPopup && (
          <div className="host__no__data__found__icon">
            <Lottie
              options={{ animationData: noData, loop: true }}
              style={{ width: "20rem", height: "20rem" }}
            />
            <p className="no__data__found">No Data Found</p>
          </div>
        )
      )}
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
        images={img}
      />
    </div>
  );
};

export default FeedbackUserTable;
