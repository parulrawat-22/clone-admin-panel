import { useEffect, useState } from "react";
import "./style.css";
import baseUrl from "../../../baseUrl";
import axios from "axios";

const UserReportTable = () => {
  const [userReportList, setUserReportList] = useState([]);

  useEffect(() => {
    getUserReport();
  }, []);

  const getUserReport = () => {
    axios
      .get(baseUrl + "admin/allfindReport", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUserReportList(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="user__report__container">
      <table className="user__report__table">
        <thead>
          <th className="user__report__header">S.No.</th>
          <th className="user__report__header">User ID</th>
          <th className="user__report__header">User Name</th>
          <th className="user__report__header">Report</th>
          <th className="user__report__header">Report ID</th>
          <th className="user__report__header">Title</th>
          <th className="user__report__header">Reason</th>
        </thead>
        <tbody>
          {userReportList.map((data, index) => {
            return (
              <tr>
                <td className="user__report__data">{index + 1}</td>
                <td className="user__report__data">{data.userId._id}</td>
                <td className="user__report__data">{data.userId.name}</td>
                <td className="user__report__data">
                  {data.targetId.hostId.name}
                </td>
                <td className="user__report__data">{data._id}</td>
                <td className="user__report__data">{data.Choose_the_Reason}</td>
                <td className="user__report__data">{data.comment}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserReportTable;
