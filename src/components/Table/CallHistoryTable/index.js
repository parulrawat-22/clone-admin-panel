import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import { NetworkConfiguration } from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";
import { useLoader } from "../../../base/Context/loaderProvider";
import Pagination from "../../Pagination";
import Lottie from "react-lottie";
import noData from "../../../base/Animation/No Data Found.json";
import { useApi } from "../../../base/Context/apiProvider";
import SearchInput from "../../SearchInput";
import { FiSearch } from "react-icons/fi";

const CallHistory = () => {
  const [getCallHistory, setGetCallHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [value, setValue] = useState("");
  const { id } = useParams();
  const apiProvider = useApi();

  const loader = useLoader();

  useEffect(() => {
    fetchCallHistory();
  }, [page, perPage, apiProvider?.apiUrl]);

  const fetchCallHistory = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.GETUSERCALLHISTORY,
      "POST",
      { id: id, page, perPage, key: value }
    )
      .then((res) => {
        loader.showLoader(false);
        console.log(res);
        setTotalCount(res?.totalCount);
        setTotalPages(res?.totalPages);
        setGetCallHistory(res.result);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  const handleText = (e) => {
    setValue(e.target.value);
  };

  const searchIcon = () => {
    return <FiSearch />;
  };

  return (
    <>
      <SearchInput
        onChange={handleText}
        placeholder="Search"
        icon={searchIcon()}
        value={value}
      />
      <div className="user__call__history__container">
        <table className="user__call__history__table">
          <thead>
            <th className="user__call__history__header">S.No.</th>
            <th className="user__call__history__header">Host ID</th>
            <th className="user__call__history__header">Host Name</th>
            <th className="user__call__history__header">Coin Spend</th>
            <th className="user__call__history__header">Mode</th>
            <th className="user__call__history__header">Is Random</th>
            <th className="user__call__history__header">Time Duration</th>
          </thead>
          <tbody>
            {getCallHistory.length > 0
              ? getCallHistory.map((data, index) => {
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
                      <td className="user__call__history__data">
                        {data?.callType}
                      </td>
                      <td className="user__call__history__data">
                        {data?.random ? (
                          <p className="user__random__call">Random</p>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="user__call__history__data">
                        {data?.total_minute}
                      </td>
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
    </>
  );
};

export default CallHistory;
