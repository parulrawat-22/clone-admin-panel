import { useEffect, useState } from "react";
import "./style.css";
import baseUrl from "../../../../baseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const [getOneUserDetail, setGetOneUserDetail] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = () => {
    axios
      .get(baseUrl + "admin/findOneUser/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setGetOneUserDetail(res.data.getOneUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="user__details__container">
      <div className="user__details__row">
        <table>
          <thead>
            <tbody>
              <div className="user__details__table">
                <div className="user__table__data">
                  <th>Name</th>
                  <td>{getOneUserDetail.name}</td>
                </div>
                <div className="user__table__data">
                  <th>Date Of Birth</th>
                  <td>{getOneUserDetail.dateOfBirth}</td>
                </div>
                <div className="user__table__data">
                  <th>Gender</th>
                  <td>{getOneUserDetail.gender}</td>
                </div>
                <div className="user__table__data">
                  <th>Mobile Number</th>
                  <td>{getOneUserDetail.mobileNumber}</td>
                </div>
                <div className="user__table__data">
                  <th>Email</th>
                  <td>{getOneUserDetail.email}</td>
                </div>
                <div className="user__table__data">
                  <th>Pin Code</th>
                  <td>{getOneUserDetail.pinCode}</td>
                </div>
                <div className="user__table__data">
                  <th>Country</th>
                  <td>{getOneUserDetail.country}</td>
                </div>
                <div className="user__table__data">
                  <th>State</th>
                  <td>{getOneUserDetail.state}</td>
                </div>
                <div className="user__table__data">
                  <th>City</th>
                  <td>{getOneUserDetail.city}</td>
                </div>
              </div>
            </tbody>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default UserDetails;
