import { useEffect, useState } from "react";
import Button from "../../components/library/Button";
import "./style.css";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import { useApi } from "../../base/Context/apiProvider";
import { NetworkConfiguration } from "../../network/NetworkConfiguration";
import moment from "moment";

const ActiveHost = () => {
  const [activeHost, setActiveHost] = useState([]);
  const apiProvider = useApi();

  useEffect(() => {
    fetchActiveHosts();
  }, [apiProvider?.apiUrl]);

  const fetchActiveHosts = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.ONLINEHOST,
      "GET"
    )
      .then((res) => {
        console.log(res);
        setActiveHost(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(activeHost, "hddddddddddd");
  return (
    <div className="active__user__container">
      <div className="active__user">
        <Button style={{ textAlign: "center" }} text="Send Notification" />
      </div>
      <div className="table_parent_box">
        <table className="active__user__table">
          <thead>
            <th className="active__user__header">S.No.</th>
            <th className="active__user__header">Host Id</th>
            <th className="active__user__header">Name</th>
            {/* <th className="active__user__header">Username</th> */}
            <th className="active__user__header">Group Name</th>
            <th className="active__user__header">Leader ID</th>
            <th className="active__user__header">Joining Date</th>
            <th className="active__user__header">Current Week Earning</th>
          </thead>
          <tbody>
            {activeHost.map((data, index) => {
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
                    {moment(data?.createdAt).format("DD/MM/YYYY ,LT")}
                  </td>
                  {/* <td className="active__user__data">{data?.leaderId}</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveHost;
