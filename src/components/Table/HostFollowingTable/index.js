import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";

const HostFollowingTable = () => {
  const [getFollowingList, setGetFollowingList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchFollowingList();
  }, []);

  const fetchFollowingList = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.HOSTFOLLOWING, "POST", {
      id: id,
    })
      .then((res) => {
        setGetFollowingList(res.result.followings);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="host__following__container">
      <table className="host__following__table">
        <thead>
          <th className="host__following__header">S.No.</th>
          <th className="host__following__header">User ID</th>
          <th className="host__following__header">User Name</th>
          <th className="host__following__header">Date Of Birth</th>
          <th className="host__following__header">Email</th>
          <th className="host__following__header">Mobile Number</th>
        </thead>
        <tbody>
          {getFollowingList.map((data, index) => {
            return (
              <tr>
                <td className="host__following__data">{index + 1}</td>
                <td className="host__following__data">{data?._id}</td>
                <td className="host__following__data">{data?.name}</td>
                <td className="host__following__data">{data?.dateOfBirth}</td>
                <td className="host__following__data">{data?.email}</td>
                <td className="host__following__data">{data?.mobileNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HostFollowingTable;
