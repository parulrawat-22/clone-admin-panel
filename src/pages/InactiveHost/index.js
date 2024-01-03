import { useEffect, useState } from "react";
import { useApi } from "../../base/Context/apiProvider";
import Button from "../../components/library/Button";
import { NetworkConfiguration } from "../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import moment from "moment";
import FormAlertPopUp from "../../components/FormAlertPopUp";
import InactiveUserForm from "../../components/formComponents/InactiveUserForm";
import "./style.css";

const InactiveHost = () => {
  const apiProvider = useApi();
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  const [inactiveHost, setInactiveHost] = useState([]);

  useEffect(() => {
    fetchInactiveHost();
  }, []);

  const fetchInactiveHost = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.OFFLINEHOST,
      "GET"
    )
      .then((res) => {
        console.log(res);
        setInactiveHost(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNotificationAlert = () => {
    setShowNotificationPopup(true);
  };

  const handleNotificationAlertClose = () => {
    setShowNotificationPopup(false);
  };

  return (
    <div className="active__user__container">
      <div className="active__user">
        <Button
          style={{ textAlign: "center" }}
          text="Send Notification"
          onClick={handleNotificationAlert}
        />
      </div>
      <div className="table_parent_box">
        <table className="active__user__table">
          <thead>
            <th className="active__user__header">S.No.</th>
            <th className="active__user__header">Host ID</th>
            <th className="active__user__header">Host Name</th>
            {/* <th className="active__user__header">Username</th> */}
            <th className="active__user__header">Group Name</th>
            <th className="active__user__header">Leader Id</th>
            <th className="active__user__header">Joining Date</th>
            <th className="active__user__header">Current Week Earning</th>
          </thead>
          <tbody>
            {inactiveHost.map((data, index) => {
              return (
                <tr>
                  <td className="active__user__data">{index + 1}</td>
                  <td className="active__user__data">{data?._id}</td>
                  <td className="active__user__data">{data?.name}</td>
                  {/* <td className="active__user__data">{data?.username}</td> */}
                  <td className="active__user__data">
                    {data?.leader?.groupName}
                  </td>

                  <td className="active__user__data">{data?.leader?._id}</td>
                  <td className="active__user__data">
                    {moment(data?.createdAt).format("DD/MM/YYYY , LT")}
                  </td>
                  <td className="active__user__data">{data?.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <FormAlertPopUp
        open={showNotificationPopup}
        onRequestClose={handleNotificationAlertClose}
      >
        <InactiveUserForm />
      </FormAlertPopUp>
    </div>
  );
};

export default InactiveHost;
