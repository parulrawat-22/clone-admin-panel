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
import { useApi } from "../../../base/Context/apiProvider";

const HostFollowingTable = () => {
  const [getFollowingList, setGetFollowingList] = useState([]);
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");

  const loader = useLoader();
  const apiProvider = useApi();

  useEffect(() => {
    fetchFollowingList();
  }, [page, perPage, apiProvider?.apiUrl]);

  const fetchFollowingList = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.HOSTFOLLOWING,
      "POST",
      {
        id: id,
        page,
        perPage,
      }
    )
      .then((res) => {
        loader.showLoader(false);
        setTotalCount(res.totalCount);
        setTotalPages(res.totalPages);
        setGetFollowingList(res.result.followings);
      })
      .catch((err) => {
        loader.showLoader(false);
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
          <th className="host__following__header">App Type</th>
          <th className="host__following__header">Mobile Number</th>
        </thead>
        <tbody>
          {getFollowingList.length > 0
            ? getFollowingList.map((data, index) => {
                return (
                  <tr>
                    <td className="host__following__data">{index + 1}</td>
                    <td className="host__following__data">{data?._id}</td>
                    <td className="host__following__data">{data?.name}</td>
                    <td className="host__following__data">
                      {data?.dateOfBirth}
                    </td>
                    <td className="host__following__data">{data?.email}</td>
                    <td className="host__following__data">{data?.appType}</td>
                    <td className="host__following__data">
                      {data?.mobileNumber}
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>

      {getFollowingList.length > 0 ? (
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
            <p className="no__data__found">No Data Found</p>
          </div>
        )
      )}
    </div>
  );
};

export default HostFollowingTable;
