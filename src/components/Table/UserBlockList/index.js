import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";
import { useLoader } from "../../../base/Context/loaderProvider";

const UserBlockedList = () => {
  const { id } = useParams();
  const [getBlockedList, setGetBlockedList] = useState([]);

  const loader = useLoader();

  useEffect(() => {
    fetchBlockList();
  }, []);

  const fetchBlockList = () => {
    loader.showLoader(true);

    fetchDataFromAPI(API_URL + NetworkConfiguration.GETUSERBLOCKLIST, "POST", {
      id: id,
    })
      .then((res) => {
        setGetBlockedList(res.result?.block);
        loader.showLoader(false);
      })
      .catch((err) => {
        console.log(err);
        loader.showLoader(false);
      });
  };
  return (
    <div className="user__block__list__container">
      <table className="user__block__list__table">
        <thead>
          <th className="user__block__list__header">S.No.</th>
          <th className="user__block__list__header">Host ID</th>
          <th className="user__block__list__header">Host Name</th>
          <th className="user__block__list__header">Date Of Birth</th>
          <th className="user__block__list__header">Email</th>
          <th className="user__block__list__header">Mobile Number</th>
          <th className="user__block__list__header">Action</th>
        </thead>
        <tbody>
          {getBlockedList.map((data, index) => {
            return (
              <tr>
                <td className="user__block__list__data">{index + 1}</td>
                <td className="user__block__list__data">{data?._id}</td>
                <td className="user__block__list__data">{data?.name}</td>
                <td className="user__block__list__data">{data?.dateOfBirth}</td>
                <td className="user__block__list__data">{data?.email}</td>
                <td className="user__block__list__data">
                  {data?.mobileNumber}
                </td>
                <td className="user__block__list__data">Unblock</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserBlockedList;
