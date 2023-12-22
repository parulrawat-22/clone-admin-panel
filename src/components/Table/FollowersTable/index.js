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

const FollowerTable = () => {
  const [getFollowerList, setGetFollowerList] = useState([]);
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");

  const loader = useLoader();
  const apiProvider = useApi();

  useEffect(() => {
    fetchFollowerList(apiProvider);
  }, [page, perPage]);

  const fetchFollowerList = (apiProvider) => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.GETUSERFOLLOWER,
      "POST",
      {
        id: id,
        page,
        perPage,
      }
    )
      .then((res) => {
        setTotalCount(res.totalCount);
        setTotalPages(res.totalPages);
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
          {getFollowerList.length > 0
            ? getFollowerList.map((data, index) => {
                return (
                  <tr>
                    <td className="followers__data">
                      {(page - 1) * perPage + index + 1}
                    </td>
                    <td className="followers__data">{data?._id}</td>
                    <td className="followers__data">{data?.name}</td>
                    <td className="followers__data">{data?.dateOfBirth}</td>
                    <td className="followers__data">{data?.email}</td>
                    <td className="followers__data">{data?.mobileNumber}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>

      {getFollowerList.length > 0 ? (
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

export default FollowerTable;
