import { useEffect, useState } from "react";
import "./style.css";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import { useParams } from "react-router-dom";
import { useLoader } from "../../../base/Context/loaderProvider";
import moment from "moment";

const UserReportTable = () => {
  const { id } = useParams();
  const [userReportList, setUserReportList] = useState([]);

  const loader = useLoader();

  useEffect(() => {
    getUserReport();
  }, []);

  const getUserReport = () => {
    loader.showLoader(true);

    fetchDataFromAPI(
      API_URL + NetworkConfiguration.USERREPORT,
      "POST",
      id ? { userId: id } : {}
    )
      .then((res) => {
        loader.showLoader(false);
        setUserReportList(res.result);
      })
      .catch((err) => {
        loader.showLoader(false);

        console.log(err);
      });
  };

  return (
    <div className="user__report__container">
      {id ? (
        <table className="user__report__table">
          <thead>
            <th className="user__report__header">S.No.</th>
            <th className="user__report__header">User ID</th>
            <th className="user__report__header">User Name</th>
            <th className="user__report__header">Report</th>
            <th className="user__report__header">Report ID</th>
            <th className="user__report__header">Title</th>
            <th className="user__report__header">Reason</th>
            <th className="user__report__header">Date & Time</th>
          </thead>
          <tbody>
            {userReportList.map((data, index) => {
              return (
                <tr>
                  <td className="user__report__data">{index + 1}</td>
                  <td className="user__report__data">{data?.userId?._id}</td>
                  <td className="user__report__data">{data?.userId?.name}</td>
                  <td className="user__report__data">
                    {data?.targetId?.hostId?.name}
                  </td>
                  <td className="user__report__data">{data?._id}</td>
                  <td className="user__report__data">
                    {data?.Choose_the_Reason}
                  </td>
                  <td className="user__report__data">{data?.comment}</td>
                  <td className="user__report__data">
                    {moment(data?.createdAt).format("DD/MM/YYYY , LT")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <table className="user__report__table">
          <thead>
            <th className="user__report__header">S.No.</th>
            <th className="user__report__header">User ID</th>
            <th className="user__report__header">User Name</th>
            <th className="user__report__header">Report</th>
            <th className="user__report__header">Report ID</th>
            <th className="user__report__header">Title</th>
            <th className="user__report__header">Reason</th>
            <th className="user__report__header">Date & Time</th>
          </thead>
          <tbody>
            {userReportList.map((data, index) => {
              return (
                <tr>
                  <td className="user__report__data">{index + 1}</td>
                  <td className="user__report__data">{data?.userId?._id}</td>
                  <td className="user__report__data">{data?.userId?.name}</td>
                  <td className="user__report__data">
                    {data?.targetId?.hostId?.name}
                  </td>
                  <td className="user__report__data">{data?._id}</td>
                  <td className="user__report__data">
                    {data?.Choose_the_Reason}
                  </td>
                  <td className="user__report__data">{data?.comment}</td>
                  <td className="user__report__data">
                    {moment(data?.createdAt).format("DD/MM/YYYY , LT")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserReportTable;
