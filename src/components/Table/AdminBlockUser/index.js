import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import { useApi } from "../../../base/Context/apiProvider";
import { NetworkConfiguration } from "../../../network/NetworkConfiguration";
import moment from "moment";
import AlertPopUp from "../../AlertPopUp";

const AdminBlockUser = () => {
  const apiProvider = useApi();

  const [blockUser, setBlockUser] = useState([]);
  const [showUnblockAlert, setShowUnblockAlert] = useState(false);
  const [id, setId] = useState("");

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

  const handleUnblockUser = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.UNBLOCKUSER,
      "PUT",
      {
        id,
      }
    )
      .then((res) => {
        console.log(res);
        setShowUnblockAlert(false);
      })
      .catch((err) => {
        console.log(err);
        setShowUnblockAlert(false);
      });
  };

  const handleUnblockClick = (id) => {
    setShowUnblockAlert(true);
    setId(id);
  };

  const handleUnblockClickClose = () => {
    setShowUnblockAlert(false);
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
                  {moment(data?.createdAt).format("DD/MM/YYYY")}
                </td>
                <td className="admin__block__data">{data?.status}</td>
                <td className="admin__block__data">
                  <p
                    className="admin__unblock"
                    onClick={() => handleUnblockClick(data?._id)}
                  >
                    Unblock
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <AlertPopUp
        open={showUnblockAlert}
        handleClose={handleUnblockClickClose}
        handleOpen={handleUnblockClick}
        header="Unblock Alert"
        description="Are you sure you want to unblock this user?"
        submitText="Yes"
        cancelText="No"
        onSubmitClick={handleUnblockUser}
        onCancelClick={handleUnblockClickClose}
      />
    </div>
  );
};

export default AdminBlockUser;
