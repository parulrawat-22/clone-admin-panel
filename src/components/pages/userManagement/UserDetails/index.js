import { useContext, useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../../network/NetworkConnection";
import { NetworkConfiguration } from "../../../../network/NetworkConfiguration";
import { useApi } from "../../../../base/Context/apiProvider";
import { Modal } from "../../../../base/Context/modalProvider";

const UserDetails = ({ id }) => {
  const [getOneUserDetail, setGetOneUserDetail] = useState({});
  const apiProvider = useApi();
  const modalProvider = useContext(Modal);

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
  return (
    <>
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
                    <td>
                      <div
                        className="feedback__table__comment"
                        onClick={
                          getOneUserDetail?.gender?.length > 12
                            ? () =>
                                modalProvider.handleCommentClick(
                                  getOneUserDetail?.gender,
                                  "Gender"
                                )
                            : () => {}
                        }
                      >
                        {getOneUserDetail?.gender}
                      </div>
                    </td>
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
    </>
  );
};

export default UserDetails;
