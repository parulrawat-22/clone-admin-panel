import { useContext, useEffect, useState } from "react";
import "./style.css";

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
import { Modal } from "../../../base/Context/modalProvider";
import { useApi } from "../../../base/Context/apiProvider";
import moment from "moment";

const HostFeedbackTable = () => {
  const [hostFeedback, setHostFeeback] = useState([]);
  const [showRevertAlert, setShowRevertAlert] = useState(false);
  const [showImageAlert, setShowImageAlert] = useState(false);
  const [img, setImg] = useState("");
  const [getId, setGetId] = useState("");
  const [replyFeedback, setReplyFeedback] = useState("");
  const [value, setValue] = useState("");
  // const [images, images]
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");

  const loader = useLoader();
  const modalProvider = useContext(Modal);
  const apiProvider = useApi();

  const { id } = useParams();

  console.log("id", id);

  const handleOnClickAlert = (img) => {
    setImg(img);
    setShowImageAlert(true);
  };

  const handleOnClickAlertClose = () => {
    setShowImageAlert(false);
  };

  const handleHostFeedbackRevert = (getId) => {
    setShowRevertAlert(true);
    setGetId(getId);
  };

  const handleHostFeedbackRevertClose = () => {
    setShowRevertAlert(false);
  };

  const handleReply = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.SENDREPLYHOST + `/${getId}`,
      "POST",
      {
        response: replyFeedback,
      }
    )
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
      apiProvider?.apiUrl + NetworkConfiguration.GETHOSTFEEDBACK,
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
        setHostFeeback(res?.result);
        setTotalCount(res?.totalCount);
        setTotalPages(res?.totalPages);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getAllHostsFeedback();
  }, [value, page, perPage, apiProvider?.apiUrl]);

  const handleText = (e) => {
    setValue(e.target.value);
  };

  console.log("hostFeedback", hostFeedback);

  const searchIcon = () => {
    return <FiSearch />;
  };
  return (
    <>
      <SearchInput
        value={value}
        onChange={handleText}
        placeholder="Search"
        icon={searchIcon()}
      />
      <div className="host__feedback__container">
        <div className="table_parent_box">
          <table className="host__feedback__table__container">
            <thead>
              <th className="host__feedback__table__heading">S.No.</th>
              {!id ? (
                <>
                  <th className="host__feedback__table__heading">Host ID</th>
                  <th className="host__feedback__table__heading">Host Name</th>
                </>
              ) : null}

              <th className="host__feedback__table__heading">Title</th>
              <th className="host__feedback__table__heading">Description</th>
              <th className="host__feedback__table__heading">Image/Video</th>
              <th className="host__feedback__table__heading">
                Contact Details
              </th>
              <th className="host__feedback__table__heading">Created At</th>
              <th className="host__feedback__table__heading">Revert Back</th>
            </thead>
            <tbody>
              {hostFeedback.length > 0 &&
                hostFeedback.map((data, index) => {
                  return (
                    <tr>
                      <td className="host__feedback__table__data">
                        {(page - 1) * perPage + index + 1}
                      </td>
                      {!id && (
                        <>
                          <td className="host__feedback__table__data">
                            {data?._id}
                          </td>
                          <td className="host__feedback__table__data">
                            {data?.hostId?.name}
                          </td>
                        </>
                      )}
                      <td className="host__feedback__table__data">
                        {data?.feedbackType}
                      </td>
                      <td className="host__feedback__table__data">
                        <div
                          className="feedback__table__comment"
                          onClick={
                            data?.comment?.length > 12
                              ? () =>
                                  modalProvider.handleCommentClick(
                                    data?.comment,
                                    "Description"
                                  )
                              : () => {}
                          }
                        >
                          {data?.comment}
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
                        {moment(data?.createdAt).format("DD/MM/YYYY LT")}
                      </td>
                      {data?.trackStatus[1]?.response ? (
                        <td className="host__feedback__table__data host__feedback__view__btn">
                          <div
                            className="feedback__table__comment"
                            onClick={
                              data?.trackStatus[1]?.response.length > 12
                                ? () =>
                                    modalProvider?.handleCommentClick(
                                      data?.trackStatus[1]?.response,
                                      "Revert"
                                    )
                                : () => {}
                            }
                          >
                            {data?.trackStatus[1]?.response}
                          </div>
                        </td>
                      ) : (
                        <td
                          onClick={() => handleHostFeedbackRevert(data?._id)}
                          className="host__feedback__table__data host__feedback__view__btn"
                        >
                          Reply
                        </td>
                      )}{" "}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {hostFeedback && hostFeedback.length > 0 ? (
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
          handleOpen={handleHostFeedbackRevert}
          handleClose={handleHostFeedbackRevertClose}
          textField={true}
          submitText="Submit"
          onSubmitClick={handleReply}
          onCancelClick={handleHostFeedbackRevertClose}
          cancelText="Cancel"
          onChangeField={(e) => setReplyFeedback(e.target.value)}
        />

        <ImagePopUpModal
          open={showImageAlert}
          handleClose={handleOnClickAlertClose}
          images={img}
        />
      </div>
    </>
  );
};

export default HostFeedbackTable;
