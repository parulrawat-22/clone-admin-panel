import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";
import { useLoader } from "../../../base/Context/loaderProvider";
import Pagination from "../../Pagination";
import Lottie from "react-lottie";
import noData from "../../../base//Animation/No Data Found.json";

const HostCallHistoryTable = () => {
  const [getCallHistory, setGetCallHistory] = useState([]);
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");

  const loader = useLoader();

  useEffect(() => {
    fetchCallHistory();
  }, [page, perPage]);

  const fetchCallHistory = () => {
    loader.showLoader(true);
    fetchDataFromAPI(API_URL + NetworkConfiguration.HOSTCALLHISTORY, "POST", {
      id: id,
      page,
      perPage,
    })
      .then((res) => {
        loader.showLoader(false);
        setTotalCount(res.totalCount);
        setTotalPages(res.totalPages);
        setGetCallHistory(res?.result);
      })
      .catch((err) => {
        loader.showLoader(false);
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
          {/* <th className="host__call__history__header">Status</th> */}
        </thead>
        <tbody>
          {getCallHistory.length > 0
            ? getCallHistory.map((data, index) => {
                return (
                  <tr>
                    <td className="host__call__history__data">{index + 1}</td>
                    <td className="host__call__history__data">{data?._id}</td>
                    <td className="host__call__history__data">
                      {data?.targetId?.name}
                    </td>
                    <td className="host__call__history__data">
                      {data?.videoCoins}
                    </td>
                    <td className="host__call__history__data">
                      {data?.callType}
                    </td>
                    <td className="host__call__history__data">
                      {data?.total_minute}
                    </td>
                    {/* <td className="host__call__history__data">{data?.status}</td> */}
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>

      {getCallHistory.length > 0 ? (
        <Pagination
          page={page}
          setPage={setPage}
          perPage={perPage}
          setPerPage={setPerPage}
          totalCount={totalCount}
          totalPages={totalPages}
          options={[5, 10, 15, 20]}
        />
      ) : (
        !loader.loaderPopup && (
          <div className="host__no__data__found__icon">
            <Lottie
              options={{ animationData: noData, loop: true }}
              style={{ width: "20rem", height: "20rem" }}
            />
            <p className="no__data__found">No Data Found</p>
          </div>
        )
      )}
    </div>
  );
};

export default HostCallHistoryTable;
