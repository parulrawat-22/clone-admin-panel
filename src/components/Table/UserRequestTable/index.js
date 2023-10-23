import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import "./style.css";
import { BsFillEyeFill } from "react-icons/bs";
import baseUrl from "../../../baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const UserTable = () => {
  let navigate = useNavigate();

  const [userRequest, setUserRequest] = useState([]);

  useEffect(() => {
    getUserRequest();
  }, []);
  const handleAcceptedRequest = () => {
    axios
      .put(
        baseUrl + "admin/getUsersPending/_id",
        {},
        { headers: { "content-type": "application/json" } },
        { authorization: "Bearer" + localStorage.getItem("token") }
      )
      .then((res) => {
        console.log(res, "res========");
        navigate("/acceptedUsers");
      })
      .catch((err) => {
        console.log(err, "err==========");
      });
  };
  const getUserRequest = () => {
    axios
      .post(
        baseUrl + "admin/getUsersPending",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res, "pending users");
        setUserRequest(res.data.result);
        // navigate("/acceptedUsers");
      })
      .catch((err) => {
        console.log(err, "err==========");
      });
  };

  return (
    <div className="user__request__table__container">
      <table className="user__request__table">
        <thead className="user__request__headers">
          <th className="user__request__headers">S.No.</th>
          <th className="user__request__headers">User ID</th>
          <th className="user__request__headers">Name</th>
          <th className="user__request__headers">Gender</th>
          <th className="user__request__headers">Date Of Birth</th>
          <th className="user__request__headers">Age</th>
          <th className="user__request__headers">Country</th>
          <th className="user__request__headers">State</th>
          <th className="user__request__headers">City</th>
          <th className="user__request__headers">Mobile Number</th>
          <th className="user__request__headers">Profession</th>
          <th className="user__request__headers">Bio</th>
          <th className="user__request__headers">Image/Video</th>
          <th className="user__request__headers">Action</th>
        </thead>
        <tbody>
          {userRequest.map((data, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{data.userId}</td>
                <td>{data.name}</td>
                <td>{data.gender}</td>
                <td>{data.dateOfBirth}</td>
                <td>{data.age}</td>
                <td>{data.country}</td>
                <td>{data.state}</td>
                <td>{data.city}</td>
                <td>{data.mobileNumber}</td>
                <td>{data.proffession}</td>
                <td>{data.addBio}</td>
                <td>
                  <BsFillEyeFill />
                </td>
                <td>
                  <TiTick />
                  <RxCross2 />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

// <tr className="user__request__row">
// <td className="user__request__row">1</td>
// <td className="user__request__row">1</td>
// <td className="user__request__row">1</td>
// <td className="user__request__row">1</td>
// <td className="user__request__row">1</td>
// <td className="user__request__row">1</td>
// <td className="user__request__row">1</td>
// <td className="user__request__row">1</td>
// <td className="user__request__row">1</td>
// <td className="user__request__row">1</td>
// <td className="user__request__row">1</td>
// <td className="user__request__row">1</td>
// <td className="user__request__row user__request__eye__icon">
//   <BsFillEyeFill />
// </td>
// <td className="user__request__row user__request__action">
//   <TiTick className="table__accept__icon" />
//   <RxCross2 className="table__reject__icon" />
// </td>
// </tr>
// <tr className="user__request__row">
// <td>1</td>
// <td>1</td>
// <td>1</td>
// <td>1</td>
// <td>1</td>
// <td>1</td>
// <td>1</td>
// <td>1</td>
// <td>1</td>
// <td>1</td>
// <td>1</td>
// <td>1</td>
// <td className="user__request__eye__icon">
//   <BsFillEyeFill />
// </td>
// <td className="user__request__action">
//   <TiTick
//     onClick={handleAcceptedRequest}
//     className="table__accept__icon"
//   />
//   <RxCross2 className="table__reject__icon" />
// </td>
// </tr>
