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
import SearchInput from "../../SearchInput";
import { FiSearch } from "react-icons/fi";

const AdminBlockUser = () => {
  const apiProvider = useApi();
  const navigate = useNavigate();
  const [blockUser, setBlockUser] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");
  const [totalCount, setTotalCount] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    fetchBlockedUser();
  }, [apiProvider?.apiUrl, page, perPage, value]);

  const fetchBlockedUser = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.BLOCKLIST,
      "POST",
      {
        blockType: "User",
        page,
        perPage,
        key: value,
      }
    )
      .then((res) => {
        setBlockUser(res?.result);
        console.log(res);
        setTotalCount(res?.totalCount);
        setTotalPages(res?.totalPages);
      })
      .catch((err) => {
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
        value={value}
        onChange={handleText}
        placeholder="Search"
        icon={searchIcon()}
      />
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
            {blockUser && blockUser.length > 0
              ? blockUser.map((data, index) => {
                  return (
                    <tr>
                      <td className="admin__block__data">{index + 1}</td>
                      <td className="admin__block__data">
                        {data?.userId?._id}
                      </td>
                      <td className="admin__block__data">
                        {data?.userId?.name}
                      </td>
                      <td className="admin__block__data">
                        {data?.blockReasion}
                      </td>
                      <td className="admin__block__data">
                        {moment(data?.createdAt).format("DD/MM/YYYY , LT")}
                      </td>
                      <td className="admin__block__data">{data?.status}</td>
                      <td className="admin__block__data">
                        <AiFillEdit
                          style={{ cursor: "pointer", fontSize: "" }}
                          onClick={() => {
                            navigate(`/usermanagement/${data?.userId?._id}`);
                          }}
                        />{" "}
                      </td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </table>

        {blockUser && blockUser.length > 0 ? (
          <Pagination
            page={page}
            perPage={perPage}
            setPage={setPage}
            setPerPage={setPerPage}
            totalCount={totalCount}
            totalPages={totalPages}
            options={[5, 10, 15, 20]}
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
    </>
  );
};

export default AdminBlockUser;
