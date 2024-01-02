import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useLoader } from "../../../base/Context/loaderProvider";
import Pagination from "../../Pagination";
import Lottie from "react-lottie";
import noData from "../../../base/Animation/No Data Found.json";
import { useApi } from "../../../base/Context/apiProvider";

const HostNotification = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");

  const loader = useLoader();
  const apiProvider = useApi();

  const [getHostNotification, setGetHostNotification] = useState([]);

  useEffect(() => {
    fetchUserNotification();
  }, [page, perPage, apiProvider?.apiUrl]);

  const fetchUserNotification = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.GETHOSTNOTIFICATION,
      "POST",
      { id: id }
    )
      .then((res) => {
        loader.showLoader(false);
        setTotalCount(res?.totalCount);
        setTotalPages(res?.totalPages);
        console.log(res);
        setGetHostNotification(res.result1);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  const getNotification = (notification) => {
    switch (notification?.statusType) {
      case "follow": {
        return notification?.followstatus;
      }
      case "profileLike": {
        return notification?.profileLikeStatus;
      }
      case "postlike": {
        return notification?.postLikeStatus;
      }
      case "sendGift": {
        return notification?.postGiftSend;
      }
      default: {
        return notification?.followstatus;
      }
    }
  };

  return (
    <div className="host__notification__container">
      <table className="host__notification__table">
        <thead>
          <th className="host__notification__header">S.No</th>
          <th className="host__notification__header">Title</th>
          <th className="host__notification__header">Body</th>
          <th className="host__notification__header">Date&Time</th>
        </thead>
        <tbody>
          {getHostNotification.length > 0
            ? getHostNotification.map((data, index) => {
                return (
                  <tr>
                    <td className="host__notification__data">{index + 1}</td>
                    <td className="host__notification__data">{data.title}</td>
                    <td className="host__notification__data">{data.body}</td>
                    <td className="host__notification__data">
                      {moment(data.followTime).format("DD/MM/YYYY ,LT")}
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>

      {getHostNotification.length > 0 ? (
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

export default HostNotification;
