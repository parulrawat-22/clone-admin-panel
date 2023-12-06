import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";
import { useLoader } from "../../../base/Context/loaderProvider";

const FollowerTable = () => {
  const [getFollowerList, setGetFollowerList] = useState([]);
  const { id } = useParams();

  const loader = useLoader();

  useEffect(() => {
    fetchFollowerList();
  }, []);

  const fetchFollowerList = () => {
    loader.showLoader(true);
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETUSERFOLLOWER, "POST", {
      id: id,
    })
      .then((res) => {
        loader.showLoader(false);
        setGetFollowerList(res.result?.followers);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };
  return (
    <div className="followers__container">
      <table className="followers__table">
        <thead>
          <th className="followers__header">S.No.</th>
          <th className="followers__header">Host ID</th>
          <th className="followers__header">Host Name</th>
          <th className="followers__header">Date Of Birth</th>
          <th className="followers__header">Email ID</th>
          <th className="followers__header">Mobile Number</th>
        </thead>
        <tbody>
          {getFollowerList.map((data, index) => {
            return (
              <tr>
                <td className="followers__data">{index + 1}</td>
                <td className="followers__data">{data?._id}</td>
                <td className="followers__data">{data?.name}</td>
                <td className="followers__data">{data?.dateOfBirth}</td>
                <td className="followers__data">{data?.email}</td>
                <td className="followers__data">{data?.mobileNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FollowerTable;
