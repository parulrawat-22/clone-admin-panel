import { useEffect, useState } from "react";
import "./style.css";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";

const UserReportTable = () => {
  const [userReportList, setUserReportList] = useState([]);

  const getUserReport = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.USERREPORT, "GET")
      .then((res) => {
        setUserReportList(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserReport();
  }, []);

  console.log(userReportList, "data");

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
