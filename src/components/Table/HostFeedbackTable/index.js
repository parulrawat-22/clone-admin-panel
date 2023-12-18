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
import { useLoader } from "../../../base/Context/loaderProvider";
import { FiSearch } from "react-icons/fi";
import SearchInput from "../../SearchInput";
import Pagination from "../../Pagination";
import noData from "../../../base/Animation/No Data Found.json";
import Lottie from "react-lottie";

const HostFeedbackTable = () => {
  const [hostFeedback, setHostFeeback] = useState([]);
  const [showRevertAlert, setShowRevertAlert] = useState(false);
  const [showImageAlert, setShowImageAlert] = useState(false);
  const [img, setImg] = useState("");
  const { id } = useParams();
  const [getId, setGetId] = useState("");
  const [replyFeedback, setReplyFeedback] = useState("");
  const [value, setValue] = useState("");

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");

  const loader = useLoader();

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

  const handleReply = () => {
    loader.showLoader(true);
    fetchDataFromAPI(API_URL + NetworkConfiguration.SENDREPLYHOST, "PUT", {
      id: getId,
      replyFeedback: replyFeedback,
    })
      .then((res) => {
        loader.showLoader(false);
        console.log(res);
        setShowRevertAlert(false);
        getAllHostsFeedback();
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  const getAllHostsFeedback = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.GETHOSTFEEDBACK,
      "POST",
      id
        ? { hostId: id }
        : {
            key: value,
            page: page,
            perPage: perPage,
          }
    )
      .then((res) => {
        loader.showLoader(false);
        setHostFeeback(res.result);
        setTotalCount(res.totalCount);
        setTotalPages(res.totalPages);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getAllHostsFeedback();
  }, [value, page, perPage]);

  const handleText = (e) => {
    setValue(e.target.value);
  };

  const searchIcon = () => {
    return <FiSearch />;
  };
  return (
    <div className="host__feedback__container">
      <div className="banner__search__btn">
        <SearchInput
          value={value}
          onChange={handleText}
          placeholder="Search"
          icon={searchIcon()}
        />
      </div>
      <div className="table_parent_box">
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
            <th className="host__feedback__table__heading">Contact Details</th>
            <th className="host__feedback__table__heading">Created At</th>
            <th className="host__feedback__table__heading">Revert Back</th>
          </thead>
          <tbody>
            {hostFeedback.length > 0
              ? hostFeedback.map((data, index) => {
                  return (
                    <tr>
                      <td className="host__feedback__table__data">
                        {" "}
                        {(page - 1) * perPage + index + 1}
                      </td>
                      {!id && (
                        <>
                          <td className="host__feedback__table__data">
                            {data._id}
                          </td>
                          <td className="host__feedback__table__data">
                            {data?.hostId?.name}
                          </td>
                        </>
                      )}
                      <td className="host__feedback__table__data">
                        {data.feedbackType}
                      </td>
                      <td className="host__feedback__table__data">
                        <div className="host__feedback__comment">
                          {data.comment}
                        </div>
                      </td>
                      <td className="host__feedback__table__data">
                        <AiFillEye
                          onClick={() => {
                            handleOnClickAlert(data?.feedbackImage);
                          }}
                          className="host__feedback__eye__icon"
                        />
                      </td>
                      <td className="host__feedback__table__data">
                        {data?.contact || data?.email}
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
                })
              : null}
          </tbody>
        </table>
      </div>

      {hostFeedback.length > 0 ? (
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
          <div>
            <Lottie
              options={{ animationData: noData, loop: true }}
              style={{ width: "10rem", height: "10rem" }}
            />
          </div>
        )
      )}

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
