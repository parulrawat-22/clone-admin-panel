import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import { useApi } from "../../../base/Context/apiProvider";
import { NetworkConfiguration } from "../../../network/NetworkConfiguration";
import moment from "moment";
import AlertPopUp from "../../AlertPopUp";

const AdminBlockHost = () => {
  const apiProvider = useApi();

  const [adminBlockHost, setAdminBlockHost] = useState([]);
  const [showUnblockAlert, setShowUnblockAlert] = useState(false);
  const [id, setId] = useState("");

  const handleHostUnblock = (id) => {
    setShowUnblockAlert(true);
    setId(id);
  };

  const handleHostUnblockClose = () => {
    setShowUnblockAlert(false);
  };

  useEffect(() => {
    fetchBlockedHost();
  }, []);

  const fetchBlockedHost = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.BLOCKLIST,
      "POST",
      {
        blockType: "Host",
      }
    )
      .then((res) => {
        console.log(res);
        setAdminBlockHost(res?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUnblockClick = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.UNBLOCKHOST,
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
                  {moment(data?.createdAt).format("DD/MM/YYYY")}
                </td>
                <td className="admin__block__data">{data?.status}</td>
                <td className="admin__block__data">
                  <p
                    className="admin__unblock"
                    onClick={() => handleHostUnblock(data?._id)}
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
        handleClose={handleHostUnblockClose}
        handleOpen={handleHostUnblock}
        header="Unblock Alert"
        description="Are you sure you want to unblock this host?"
        submitText="Yes"
        cancelText="No"
        onSubmitClick={handleUnblockClick}
        onCancelClick={handleHostUnblockClose}
      />
    </div>
  );
};

export default AdminBlockHost;
