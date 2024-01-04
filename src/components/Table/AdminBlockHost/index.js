import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import { useApi } from "../../../base/Context/apiProvider";
import { NetworkConfiguration } from "../../../network/NetworkConfiguration";
import moment from "moment";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Pagination";
import Lottie from "react-lottie";
import noData from "../../../base/Animation/No Data Found.json";

const AdminBlockHost = () => {
  const apiProvider = useApi();
  const navigate = useNavigate();
  const [adminBlockHost, setAdminBlockHost] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");

  useEffect(() => {
    fetchBlockedHost();
  }, [apiProvider?.apiUrl, page, perPage]);

  const fetchBlockedHost = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.BLOCKLIST,
      "POST",
      {
        blockType: "Host",
        page,
        perPage,
      }
    )
      .then((res) => {
        console.log(res);
        setAdminBlockHost(res?.result);
        setTotalCount(res?.totalCount);
        setTotalPages(res?.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="admin__block__container">
      <table className="admin__block__table">
        <thead>
          <th className="admin__block__header">S.No.</th>
          <th className="admin__block__header">User ID</th>
          <th className="admin__block__header">User Name</th>
          <th className="admin__block__header">Block Reason</th>
          <th className="admin__block__header">Blocked Date&Time</th>
          <th className="admin__block__header">Status</th>
          <th className="admin__block__header">Action</th>
        </thead>
        <tbody>
          {adminBlockHost?.map((data, index) => {
            return (
              <tr>
                <td className="admin__block__data">{index + 1}</td>
                <td className="admin__block__data">{data?.hostId?._id}</td>
                <td className="admin__block__data">{data?.hostId?.name}</td>
                <td className="admin__block__data">{data?.blockReasion}</td>
                <td className="admin__block__data">
                  {moment(data?.createdAt).format("DD/MM/YYYY , LT")}
                </td>
                <td className="admin__block__data">{data?.status}</td>
                <td className="admin__block__data">
                  <AiFillEdit
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate(`/hostmanagement/${data?.hostId?._id}`);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {adminBlockHost && adminBlockHost.length > 0 ? (
        <Pagination
          page={page}
          setPage={setPage}
          perPage={perPage}
          setPerPage={setPerPage}
          totalCount={totalCount}
          totalPages={totalPages}
          options={[5, 10, 25, 20]}
        />
      ) : (
        <div className="host__no__data__found__icon">
          <Lottie
            options={{ animationData: noData, loop: true }}
            style={{ width: "20rem", height: "20rem" }}
          />
          <p className="no__data__found">No Data Found</p>
        </div>
      )}
    </div>
  );
};

export default AdminBlockHost;
