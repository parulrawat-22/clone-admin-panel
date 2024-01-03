import { useContext, useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../../network/NetworkConnection";
import { NetworkConfiguration } from "../../../../network/NetworkConfiguration";
import { useApi } from "../../../../base/Context/apiProvider";
import { Modal } from "../../../../base/Context/modalProvider";
import Button from "../../../library/Button";
import AlertPopUp from "../../../AlertPopUp";

const UserDetails = ({ id }) => {
  const [getOneUserDetail, setGetOneUserDetail] = useState({});
  const apiProvider = useApi();
  const modalProvider = useContext(Modal);

  const [showBlockAlert, setShowBlockAlert] = useState(false);
  const [reason, setReason] = useState("");
  const [showUnblockAlert, setShowUnblockAlert] = useState(false);
  // const [id, setId] = useState("");

  useEffect(() => {
    getUserDetail();
  }, [apiProvider?.apiUrl]);

  const getUserDetail = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.FINDONEUSER + `/${id}`,
      "GET"
    )
      .then((res) => {
        setGetOneUserDetail(res?.getOneUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBlockUser = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.BLOCKUSER,
      "PUT",
      {
        id,
        blockReasion: reason,
      }
    )
      .then((res) => {
        console.log(res);
        setShowBlockAlert(false);
        getUserDetail();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBlockClick = () => {
    setShowBlockAlert(true);
  };

  const handleBlockClickClose = () => {
    setShowBlockAlert(false);
  };

  const handleUnblockUser = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.UNBLOCKUSER,
      "PUT",
      {
        id,
      }
    )
      .then((res) => {
        console.log(res);
        setShowUnblockAlert(false);
        getUserDetail();
      })
      .catch((err) => {
        console.log(err);
        setShowUnblockAlert(false);
      });
  };

  const handleUnblockClick = () => {
    setShowUnblockAlert(true);
    // setId(id);
  };

  const handleUnblockClickClose = () => {
    setShowUnblockAlert(false);
  };
  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "flex-end", height: "3rem" }}
      >
        {getOneUserDetail?.isBlock ? (
          <Button
            style={{
              backgroundColor: "#fe3b3b",
              width: "8rem",
              fontSize: "18px",
              textAlign: "center",
            }}
            text="Unblock User"
            onClick={handleUnblockClick}
          />
        ) : (
          <Button
            style={{
              backgroundColor: "#fe3b3b",
              width: "8rem",
              fontSize: "18px",
              textAlign: "center",
            }}
            text="Block User"
            onClick={handleBlockClick}
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div className="user__management__profile">
          <img
            className="user__management__profile_pic"
            src={getOneUserDetail?.profilePic}
            alt=""
          />
        </div>
        <div className="user__details__container">
          <div className="user__details__row">
            <table>
              <thead>
                <tbody>
                  <div className="user__details__table">
                    <div className="user__table__data">
                      <th>Name</th>
                      <td>
                        {" "}
                        <div
                          className="feedback__table__comment"
                          onClick={
                            getOneUserDetail?.name?.length > 12
                              ? () =>
                                  modalProvider.handleCommentClick(
                                    getOneUserDetail?.name,
                                    "Name"
                                  )
                              : () => {}
                          }
                        >
                          {getOneUserDetail?.name}
                        </div>
                      </td>
                    </div>
                    <div className="user__table__data">
                      <th>Date Of Birth</th>
                      <td>{getOneUserDetail?.dateOfBirth}</td>
                    </div>
                    <div className="user__table__data">
                      <th>Gender</th>
                      <td>{getOneUserDetail?.gender}</td>
                    </div>
                    <div className="user__table__data">
                      <th>Mobile Number</th>
                      <td>{getOneUserDetail?.mobileNumber}</td>
                    </div>
                    <div className="user__table__data">
                      <th>Email</th>
                      <td>
                        <div
                          className="feedback__table__comment"
                          onClick={
                            getOneUserDetail?.email?.length > 12
                              ? () =>
                                  modalProvider.handleCommentClick(
                                    getOneUserDetail?.email,
                                    "Email"
                                  )
                              : () => {}
                          }
                        >
                          {getOneUserDetail?.email}
                        </div>
                      </td>
                    </div>
                    <div className="user__table__data">
                      <th>Pin Code</th>
                      <td>{getOneUserDetail?.pinCode}</td>
                    </div>
                    <div className="user__table__data">
                      <th>Country</th>
                      <td>
                        <div
                          className="feedback__table__comment"
                          onClick={
                            getOneUserDetail?.country?.length > 12
                              ? () =>
                                  modalProvider.handleCommentClick(
                                    getOneUserDetail?.country,
                                    "Name"
                                  )
                              : () => {}
                          }
                        >
                          {getOneUserDetail?.country}
                        </div>
                      </td>
                    </div>
                    <div className="user__table__data">
                      <th>State</th>
                      <td>{getOneUserDetail?.state}</td>
                    </div>
                    <div className="user__table__data">
                      <th>City</th>
                      <td>{getOneUserDetail?.city}</td>
                    </div>
                    <div className="user__table__data">
                      <th>Interests</th>
                      <td>{getOneUserDetail?.myInterests}</td>
                    </div>
                  </div>
                </tbody>
              </thead>
            </table>
          </div>
        </div>
      </div>
      <AlertPopUp
        open={showBlockAlert}
        handleClose={handleBlockClickClose}
        handleOpen={handleBlockClick}
        header="Block Alert"
        description="Are you sure you want to block this user?"
        submitText="Yes"
        cancelText="No"
        onSubmitClick={handleBlockUser}
        onCancelClick={handleBlockClickClose}
      />

      <AlertPopUp
        open={showUnblockAlert}
        handleClose={handleUnblockClickClose}
        handleOpen={handleUnblockClick}
        header="Unblock Alert"
        description="Are you sure you want to unblock this user?"
        submitText="Yes"
        cancelText="No"
        onSubmitClick={handleUnblockUser}
        onCancelClick={handleUnblockClickClose}
      />
    </div>
  );
};

export default UserDetails;
