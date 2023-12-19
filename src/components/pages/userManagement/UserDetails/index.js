import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../../network/NetworkConfiguration";

const UserDetails = ({ id }) => {
  const [getOneUserDetail, setGetOneUserDetail] = useState("");

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.FINDONEUSER + `/${id}`,
      "GET"
    )
      .then((res) => {
        setGetOneUserDetail(res.getOneUser);
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
                    <td>{getOneUserDetail?.name}</td>
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
                    <td>{getOneUserDetail?.email}</td>
                  </div>
                  <div className="user__table__data">
                    <th>Pin Code</th>
                    <td>{getOneUserDetail?.pinCode}</td>
                  </div>
                  <div className="user__table__data">
                    <th>Country</th>
                    <td>{getOneUserDetail?.country}</td>
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
