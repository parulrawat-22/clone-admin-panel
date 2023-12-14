import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";
import { useLoader } from "../../../base/Context/loaderProvider";
import Pagination from "../../Pagination";
import Lottie from "react-lottie";
import noData from "../../../base/Animation/No Data Found.json";

const HostFollowerTable = () => {
  const [getHostFollower, setGetHostFollower] = useState([]);
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");

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
        setTotalCount(res?.totalCount);
        setTotalPages(res?.totalPages);
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
          {getHostFollower.length > 0
            ? getHostFollower.map((data, index) => {
                return (
                  <tr>
                    <td className="host__follower__data">{index + 1}</td>
                    <td className="host__follower__data">{data?._id}</td>
                    <td className="host__follower__data">{data?.name}</td>
                    <td className="host__follower__data">
                      {data?.dateOfBirth}
                    </td>
                    <td className="host__follower__data">{data?.email}</td>
                    <td className="host__follower__data">
                      {data?.mobileNumber}
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>

      {getHostFollower.length > 0 ? (
        <Pagination
          page={page}
          setPage={setPage}
          perPage={perPage}
          setPerPage={setPerPage}
          totalCount={totalCount}
          totalPages={totalPages}
          options={[5, 10, 15, 20]}
        />
      ) : (
        !loader.loaderPopup && (
          <div className="host__no__data__found__icon">
            <Lottie
              options={{ animationData: noData, loop: true }}
              style={{ width: "20rem", height: "20rem" }}
            />
            <p className="no__data__found"> No Data Found</p>
          </div>
        )
      )}
    </div>
  );
};

export default HostFollowerTable;
