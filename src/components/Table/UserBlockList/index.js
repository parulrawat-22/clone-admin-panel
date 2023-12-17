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

const UserBlockedList = () => {
  const { id } = useParams();
  const [getBlockedList, setGetBlockedList] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const loader = useLoader();

  useEffect(() => {
    fetchBlockList();
  }, [page, perPage]);

  const fetchBlockList = () => {
    loader.showLoader(true);

    fetchDataFromAPI(API_URL + NetworkConfiguration.GETUSERBLOCKLIST, "POST", {
      id: id,
      page,
      perPage,
    })
      .then((res) => {
        setGetBlockedList(res.result?.block);
        loader.showLoader(false);
        setTotalCount(res?.totalCount);
        setTotalPages(res?.totalPages);
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
          {getBlockedList.length > 0
            ? getBlockedList.map((data, index) => {
                return (
                  <tr>
                    <td className="user__block__list__data">{index + 1}</td>
                    <td className="user__block__list__data">{data?._id}</td>
                    <td className="user__block__list__data">{data?.name}</td>
                    <td className="user__block__list__data">
                      {data?.dateOfBirth}
                    </td>
                    <td className="user__block__list__data">{data?.email}</td>
                    <td className="user__block__list__data">
                      {data?.mobileNumber}
                    </td>
                    <td className="user__block__list__data">Block</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>

      {getBlockedList.length > 0 ? (
        <Pagination
          page={page}
          perPage={perPage}
          totalCount={totalCount}
          totalPages={totalPages}
          setPage={setPage}
          setPerPage={setPerPage}
          options={[5, 10, 15, 20]}
        />
      ) : (
        <div className="block_no__data__found__icon">
          <Lottie
            options={{ animationData: noData, loop: true }}
            style={{ width: "20rem", height: "20rem" }}
          />
          <p className="block__para">No Data Found</p>
        </div>
      )}
    </div>
  );
};

export default UserBlockedList;
