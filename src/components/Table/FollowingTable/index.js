import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";
import { useLoader } from "../../../base/Context/loaderProvider";
import Lottie from "react-lottie";
import noData from "../../../base/Animation/No Data Found.json";
import Pagination from "../../Pagination";

const FollowingTable = () => {
  const [getFollowingList, setGetFollowingList] = useState([]);
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");

  const loader = useLoader();

  useEffect(() => {
    fetchFollowingList();
  }, [page, perPage]);

  const fetchFollowingList = () => {
    loader.showLoader(true);
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETUSERFOLLOWING, "POST", {
      id: id,
      page,
      perPage,
    })
      .then((res) => {
        setTotalCount(res.totalCount);
        setTotalPages(res.totalPages);
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

      {getFollowingList.length > 0 ? (
        <Pagination
          page={page}
          setPage={setPage}
          totalCount={totalCount}
          totalPages={totalPages}
          perPage={perPage}
          setPerPage={setPerPage}
          options={[5, 10, 15, 20]}
        />
      ) : (
        !loader.loaderPopup && (
          <div className="host__no__data__found__icon">
            <Lottie
              options={{ animationData: noData, loop: true }}
              style={{ width: "20rem", height: "20rem" }}
            />
            <p className="no__data__found">No Data Found</p>
          </div>
        )
      )}
    </div>
  );
};

export default FollowingTable;
