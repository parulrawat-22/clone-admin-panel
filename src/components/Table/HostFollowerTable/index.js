import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";
import { useLoader } from "../../../base/Context/loaderProvider";

const HostFollowerTable = () => {
  const [getHostFollower, setGetHostFollower] = useState([]);
  const { id } = useParams();

  const loader = useLoader();

  useEffect(() => {
    fetchHostFollower();
  }, []);

  const fetchHostFollower = () => {
    loader.showLoader(true);
    fetchDataFromAPI(API_URL + NetworkConfiguration.HOSTFOLLOWER, "POST", {
      id: id,
    })
      .then((res) => {
        loader.showLoader(false);
        setGetHostFollower(res.result.followers);
      })
      .catch((err) => {
        loader.showLoader(false);
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
                <td className="host__follower__data">{data?._id}</td>
                <td className="host__follower__data">{data?.name}</td>
                <td className="host__follower__data">{data?.dateOfBirth}</td>
                <td className="host__follower__data">{data?.email}</td>
                <td className="host__follower__data">{data?.mobileNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HostFollowerTable;
