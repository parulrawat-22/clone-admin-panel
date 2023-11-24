import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";

const CallHistory = () => {
  const [getCallHistory, setGetCallHistory] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchCallHistory();
  }, []);

  const fetchCallHistory = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.GETUSERCALLHISTORY,
      "POST",
      { id: id }
    )
      .then((res) => {
        setGetCallHistory(res.result?.userCallhistorys);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="user__call__history__container">
      <table className="user__call__history__table">
        <thead>
          <th className="user__call__history__header">S.No.</th>
          <th className="user__call__history__header">Host ID</th>
          <th className="user__call__history__header">Host Name</th>
          <th className="user__call__history__header">Coin Spend</th>
          <th className="user__call__history__header">Mode</th>
          <th className="user__call__history__header">Time Duration</th>
          <th className="user__call__history__header">Status</th>
        </thead>
        <tbody>
          {getCallHistory.map((data, index) => {
            return (
              <tr>
                <td className="user__call__history__data">{index + 1}</td>
                <td className="user__call__history__data">{data?._id}</td>
                <td className="user__call__history__data">{data?.name}</td>
                <td className="user__call__history__data">{data?.coin}</td>
                <td className="user__call__history__data">{data?.mode}</td>
                <td className="user__call__history__data">{data?.time}</td>
                <td className="user__call__history__data">{data?.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CallHistory;
