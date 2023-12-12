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

const HostReportTable = () => {
  const [getHostReport, setGetHostReport] = useState([]);
  const { id } = useParams();
  const [value, setValue] = useState("");

  const loader = useLoader();

  const getHostReportList = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.HOSTREPORT,
      "POST",
      id ? { hostId: id } : { key: value }
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
  }, [value]);

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
            <th className="host__report__header">Date & Time</th>
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
                  <td className="host__report__data">
                    {moment(data?.createdAt).format("DD/MM/YYYY , LT")}
                  </td>
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
            <th className="host__report__header">Date & Time</th>
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
                  <td className="host__report__data">
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

export default HostReportTable;
