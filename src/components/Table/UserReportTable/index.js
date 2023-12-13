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
import { FiSearch } from "react-icons/fi";
import SearchInput from "../../SearchInput";
import Pagination from "../../Pagination";

const UserReportTable = () => {
  const { id } = useParams();
  const [userReportList, setUserReportList] = useState([]);
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");

  const loader = useLoader();

  useEffect(() => {
    getUserReport();
  }, [value, page, perPage]);

  const getUserReport = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.USERREPORT,
      "POST",
      id ? { userId: id } : { key: value, page, perPage }
    )
      .then((res) => {
        setUserReportList(res.result);
        setTotalCount(res.totalCount);
        setTotalPages(res.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchIcon = () => {
    return <FiSearch />;
  };

  const handleText = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="user__report__container">
      <div className="banner__search__btn">
        <SearchInput
          value={value}
          onChange={handleText}
          placeholder="Search"
          icon={searchIcon()}
        />
      </div>
      <div className="table_parent_box">
        <table className="user__report__table">
          <thead>
            <th className="user__report__header">S.No.</th>
            {!id && (
              <>
                <th className="user__report__header">User ID</th>
                <th className="user__report__header">User Name</th>
              </>
            )}
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
                  <td className="user__report__data">
                    {(page - 1) * perPage + index + 1}
                  </td>
                  {!id && (
                    <>
                      <td className="user__report__data">
                        {data?.userId?._id}
                      </td>
                      <td className="user__report__data">
                        {data?.userId?.name}
                      </td>
                    </>
                  )}
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
      </div>

      <Pagination
        page={page}
        perPage={perPage}
        totalCount={totalCount}
        totalPages={totalPages}
        setPage={setPage}
        setPerPage={setPerPage}
        options={[5, 10, 15, 20]}
      />
    </div>
  );
};

export default UserReportTable;
