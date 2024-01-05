import { useContext, useEffect, useState } from "react";
import "./style.css";
import { NetworkConfiguration } from "../../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import { useParams } from "react-router-dom";
import { useLoader } from "../../../base/Context/loaderProvider";
import moment from "moment";
import { FiSearch } from "react-icons/fi";
import SearchInput from "../../SearchInput";
import Pagination from "../../Pagination";
import Lottie from "react-lottie";
import noData from "../../../base/Animation/No Data Found.json";
import { Modal } from "../../../base/Context/modalProvider";
import { useApi } from "../../../base/Context/apiProvider";

const UserReportTable = () => {
  const { id } = useParams();
  const [userReportList, setUserReportList] = useState([]);
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");

  const loader = useLoader();
  const modalProvider = useContext(Modal);
  const apiProvider = useApi();

  useEffect(() => {
    getUserReport();
  }, [value, page, perPage, apiProvider?.apiUrl]);

  const getUserReport = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.USERREPORT,
      "POST",
      id ? { userId: id } : { key: value, page, perPage }
    )
      .then((res) => {
        setUserReportList(res.result);
        setTotalCount(res.totalCount);
        setTotalPages(res.totalPages);
        loader.showLoader(false);
      })
      .catch((err) => {
        console.log(err);
        loader.showLoader(false);
      });
  };

  const searchIcon = () => {
    return <FiSearch />;
  };

  const handleText = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <SearchInput
        value={value}
        onChange={handleText}
        placeholder="Search"
        icon={searchIcon()}
      />
      <div className="user__report__container">
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
              {userReportList.length > 0
                ? userReportList.map((data, index) => {
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
                              <div
                                className="feedback__table__comment"
                                onClick={
                                  data?.userId?.name.length > 12
                                    ? () =>
                                        modalProvider.handleCommentClick(
                                          data?.userId?.name,
                                          "Name"
                                        )
                                    : () => {}
                                }
                              >
                                {data?.userId?.name}
                              </div>
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
                  })
                : null}
            </tbody>
          </table>
        </div>

        {userReportList.length > 0 ? (
          <Pagination
            page={page}
            perPage={perPage}
            totalCount={totalCount}
            totalPages={totalPages}
            setPage={setPage}
            setPerPage={setPerPage}
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

export default UserReportTable;
