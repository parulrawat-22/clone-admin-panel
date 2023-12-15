import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";
import { useLoader } from "../../../base/Context/loaderProvider";
import moment from "moment";
import SearchInput from "../../SearchInput";
import { FiSearch } from "react-icons/fi";
import { useDebounce } from "use-debounce";
import Pagination from "../../Pagination";
import Lottie from "react-lottie";
import noData from "../../../base/Animation/No Data Found.json";

const HostReportTable = () => {
  const [getHostReport, setGetHostReport] = useState([]);
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");

  const loader = useLoader();

  const getHostReportList = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.HOSTREPORT,
      "POST",
      id ? { hostId: id } : { key: value, page, perPage }
    )
      .then((res) => {
        loader.showLoader(false);
        setGetHostReport(res.result);
        setTotalCount(res?.totalCount);
        setTotalPages(res?.totalPages);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getHostReportList();
  }, [value, page, perPage]);

  const searchIcon = () => {
    return <FiSearch />;
  };

  const handleText = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="host__report__container">
      <div className="banner__search__btn">
        <SearchInput
          onChange={handleText}
          value={value}
          placeholder="Search"
          icon={searchIcon()}
        />
      </div>
      <table className="host__report__table">
        <thead>
          <th className="host__report__header">S.No.</th>
          {!id && (
            <>
              <th className="host__report__header">Host ID</th>
              <th className="host__report__header">Host Name</th>
            </>
          )}
          <th className="host__report__header">Report</th>
          <th className="host__report__header">Report ID</th>
          <th className="host__report__header">Title</th>
          <th className="host__report__header">Reason</th>
          <th className="host__report__header">Date & Time</th>
        </thead>
        <tbody>
          {getHostReport.length > 0
            ? getHostReport.map((data, index) => {
                return (
                  <tr>
                    <td className="host__report__data">
                      {(page - 1) * perPage + index + 1}
                    </td>
                    {!id && (
                      <>
                        {" "}
                        <td className="host__report__data">
                          {data?.hostId?._id}
                        </td>
                        <td className="host__report__data">
                          {data?.hostId?.name}
                        </td>
                      </>
                    )}
                    <td className="host__report__data">
                      {data?.targetId?.userId?.name}
                    </td>
                    <td className="host__report__data">{data?._id}</td>
                    <td className="host__report__data">
                      {data?.Choose_the_Reason}
                    </td>
                    <td className="host__report__data">{data?.comment}</td>
                    <td className="host__report__data">
                      {moment(data?.createdAt).format("DD/MM/YYYY , LT")}
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>

      {getHostReport.length > 0 ? (
        <Pagination
          page={page}
          setPage={setPage}
          setPerPage={setPerPage}
          perPage={perPage}
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

export default HostReportTable;
