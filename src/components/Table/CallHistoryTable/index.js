import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";
import { useLoader } from "../../../base/Context/loaderProvider";

const CallHistory = () => {
  const [getCallHistory, setGetCallHistory] = useState([]);
  const { id } = useParams();

  const loader = useLoader();

  useEffect(() => {
    fetchCallHistory();
  }, []);

  const fetchCallHistory = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.GETUSERCALLHISTORY,
      "POST",
      { id: id }
    )
      .then((res) => {
        loader.showLoader(false);
        console.log(res);
        setGetCallHistory(res.result);
      })
      .catch((err) => {
        loader.showLoader(false);
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
          {/* <th className="user__call__history__header">Status</th> */}
        </thead>
        <tbody>
          {getCallHistory.map((data, index) => {
            return (
              <tr>
                <td className="user__call__history__data">{index + 1}</td>
                <td className="user__call__history__data">{data?._id}</td>
                <td className="user__call__history__data">
                  {data?.targetId?.name}
                </td>
                <td className="user__call__history__data">
                  {data?.videoCoins}
                </td>
                <td className="user__call__history__data">{data?.callType}</td>
                <td className="user__call__history__data">
                  {data?.total_minute}
                </td>
                {/* <td className="user__call__history__data">{data?.status}</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CallHistory;
