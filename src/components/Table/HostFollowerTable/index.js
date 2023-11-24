import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";

const HostFollowerTable = () => {
  const [getHostFollower, setGetHostFollower] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchHostFollower();
  }, []);

  const fetchHostFollower = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.HOSTFOLLOWER, "POST", {
      id: id,
    })
      .then((res) => {
        setGetHostFollower(res.result.followers);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="host__follower__container">
      <table className="host__follower__table">
        <thead>
          <th className="host__follower__header">S.No.</th>
          <th className="host__follower__header">User ID</th>
          <th className="host__follower__header">User Name</th>
          <th className="host__follower__header">Date Of Birth</th>
          <th className="host__follower__header">Email</th>
          <th className="host__follower__header">Mobile Number</th>
        </thead>
        <tbody>
          {getHostFollower.map((data, index) => {
            return (
              <tr>
                <td className="host__follower__data">{index + 1}</td>
                <td className="host__follower__data">{data?.followers?._id}</td>
                <td className="host__follower__data">
                  {data?.followers?.name}
                </td>
                <td className="host__follower__data">
                  {data?.followers?.dateOfBirth}
                </td>
                <td className="host__follower__data">
                  {data?.followers?.email}
                </td>
                <td className="host__follower__data">
                  {data?.followers?.mobileNumber}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HostFollowerTable;
