import { useApi } from "../../base/Context/apiProvider";
import { useLoader } from "../../base/Context/loaderProvider";
import Button from "../../components/library/Button";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import "./style.css";
import { useEffect, useState } from "react";

const ActiveUser = () => {
  const apiProvider = useApi();
  const [activeUser, setActiveUser] = useState([]);
  const loader = useLoader();
  useEffect(() => {
    fetchActiveUser();
  }, [apiProvider?.apiUrl]);

  const fetchActiveUser = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.ONLINEUSER,
      "GET"
    )
      .then((res) => {
        loader.showLoader(false);
        setActiveUser(res?.data);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err, "err========");
      });
  };

  return (
    <div className="active__user__container">
      <div className="active__user">
        <Button style={{ textAlign: "center" }} text="Send Notification" />
      </div>
      <div className="table_parent_box">
        <table className="active__user__table">
          <thead>
            <th className="active__user__header">S.No.</th>
            <th className="active__user__header">User ID</th>
            <th className="active__user__header">Name</th>
            <th className="active__user__header">Username</th>
            <th className="active__user__header">Email</th>
            <th className="active__user__header">Mobile Number</th>
            <th className="active__user__header">Created At</th>
            {/* <th className="active__user__header">Email</th> */}
          </thead>
          <tbody>
            {activeUser && activeUser.length > 0 ? (
              activeUser.map((data, index) => {
                return (
                  <tr>
                    <td className="active__user__data">{index + 1}</td>
                    <td className="active__user__data">{data?.userId}</td>
                    <td className="active__user__data">{data?.name}</td>
                    <td className="active__user__data">{data?.username}</td>
                    <td className="active__user__data">{data?.email}</td>
                    <td className="active__user__data">{data?.mobileNumber}</td>
                    <td className="active__user__data">{data?.createdAt}</td>
                  </tr>
                );
              })
            ) : (
              <div></div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveUser;
