import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";

const HostCallHistoryTable = () => {
  const [getCallHistory, setGetCallHistory] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchCallHistory();
  }, []);

  const fetchCallHistory = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.HOSTCALLHISTORY, "POST", {
      id: id,
    })
      .then((res) => {
        setGetCallHistory(res.result.userCallhistorys);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="host__call__history__container">
      <table className="host__call__history__table">
        <thead>
          <th className="host__call__history__header">S.No.</th>
          <th className="host__call__history__header">User ID</th>
          <th className="host__call__history__header">User Name</th>
          <th className="host__call__history__header">Coin Spend</th>
          <th className="host__call__history__header">Mode</th>
          <th className="host__call__history__header">Time Duration</th>
          <th className="host__call__history__header">Status</th>
        </thead>
        <tbody>
          {getCallHistory.map((data, index) => {
            return (
              <tr>
                <td className="host__call__history__data">{index + 1}</td>
                <td className="host__call__history__data">{data?._id}</td>
                <td className="host__call__history__data">{data?.name}</td>
                <td className="host__call__history__data">
                  {data?.coin_spend}
                </td>
                <td className="host__call__history__data">{data?.mode}</td>
                <td className="host__call__history__data">
                  {data?.timeDuration}
                </td>
                <td className="host__call__history__data">{data?.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HostCallHistoryTable;
