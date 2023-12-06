import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";
import { useLoader } from "../../../base/Context/loaderProvider";

const FollowingTable = () => {
  const [getFollowingList, setGetFollowingList] = useState([]);
  const { id } = useParams();

  const loader = useLoader();

  useEffect(() => {
    fetchFollowingList();
  }, []);

  const fetchFollowingList = () => {
    loader.showLoader(true);
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETUSERFOLLOWING, "POST", {
      id: id,
    })
      .then((res) => {
        loader.showLoader(false);
        setGetFollowingList(res.result?.followings);
      })
      .catch((err) => {
        console.log(err);
        loader.showLoader(false);
      });
  };

  return (
    <div className="following__container">
      <table className="following__table">
        <thead>
          <th className="following__header">S.No.</th>
          <th className="following__header">Host ID</th>
          <th className="following__header">Host Name</th>
          <th className="following__header">Date Of Birth</th>
          <th className="following__header">Email</th>
          <th className="following__header">Mobile Number</th>
        </thead>
        <tbody>
          {getFollowingList.map((data, index) => {
            return (
              <tr>
                <td className="following__data">{index + 1}</td>
                <td className="following__data">{data?._id}</td>
                <td className="following__data">{data?.name}</td>
                <td className="following__data">{data?.dateOfBirth}</td>
                <td className="following__data">{data?.email}</td>
                <td className="following__data">{data?.mobileNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FollowingTable;
