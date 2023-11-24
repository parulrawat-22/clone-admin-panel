import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";

const HostReportTable = () => {
  const [getHostReport, setGetHostReport] = useState([]);
  const { id } = useParams();

  const getHostReportList = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.HOSTREPORT,
      "POST",
      id ? { hostId: id } : {}
    )
      .then((res) => {
        setGetHostReport(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getHostReportList();
  }, []);

  return (
    <div className="host__report__container">
      {id ? (
        <table className="host__report__table">
          <thead>
            <th className="host__report__header">S.No.</th>
            <th className="host__report__header">Host ID</th>
            <th className="host__report__header">Host Name</th>
            <th className="host__report__header">Report</th>
            <th className="host__report__header">Report ID</th>
            <th className="host__report__header">Title</th>
            <th className="host__report__header">Reason</th>
          </thead>
          <tbody>
            {getHostReport.map((data, index) => {
              return (
                <tr>
                  <td className="host__report__data">{index + 1}</td>
                  <td className="host__report__data">{data?.hostId?._id}</td>
                  <td className="host__report__data">{data?.hostId?.name}</td>
                  <td className="host__report__data">
                    {data?.targetId?.userId?.name}
                  </td>
                  <td className="host__report__data">{data?._id}</td>
                  <td className="host__report__data">
                    {data?.Choose_the_Reason}
                  </td>
                  <td className="host__report__data">{data?.comment}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <table className="host__report__table">
          <thead>
            <th className="host__report__header">S.No.</th>
            <th className="host__report__header">Host ID</th>
            <th className="host__report__header">Host Name</th>
            <th className="host__report__header">Report</th>
            <th className="host__report__header">Report ID</th>
            <th className="host__report__header">Title</th>
            <th className="host__report__header">Reason</th>
          </thead>
          <tbody>
            {getHostReport.map((data, index) => {
              return (
                <tr>
                  <td className="host__report__data">{index + 1}</td>
                  <td className="host__report__data">{data?.hostId?._id}</td>
                  <td className="host__report__data">{data?.hostId?.name}</td>
                  <td className="host__report__data">
                    {data?.targetId?.userId?.name}
                  </td>
                  <td className="host__report__data">{data?._id}</td>
                  <td className="host__report__data">
                    {data?.Choose_the_Reason}
                  </td>
                  <td className="host__report__data">{data?.comment}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HostReportTable;
