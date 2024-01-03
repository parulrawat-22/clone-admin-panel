import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import { useApi } from "../../../base/Context/apiProvider";
import { NetworkConfiguration } from "../../../network/NetworkConfiguration";
import moment from "moment";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AdminBlockUser = () => {
  const apiProvider = useApi();
  const navigate = useNavigate();
  const [blockUser, setBlockUser] = useState([]);

  useEffect(() => {
    fetchBlockedUser();
  }, []);

  const fetchBlockedUser = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.BLOCKLIST,
      "POST",
      {
        blockType: "User",
      }
    )
      .then((res) => {
        setBlockUser(res?.result);
        console.log(res);
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
          {blockUser.map((data, index) => {
            return (
              <tr>
                <td className="admin__block__data">{index + 1}</td>
                <td className="admin__block__data">{data?.userId?._id}</td>
                <td className="admin__block__data">{data?.userId?.name}</td>
                <td className="admin__block__data">{data?.blockReasion}</td>
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
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBlockUser;
