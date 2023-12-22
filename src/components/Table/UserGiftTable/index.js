import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AiFillEye } from "react-icons/ai";
import ImagePopUpModal from "../../ImagePopUpModal";
import { useLoader } from "../../../base/Context/loaderProvider";
import Pagination from "../../Pagination";
import Lottie from "react-lottie";
import noData from "../../../base/Animation/No Data Found.json";
import { useApi } from "../../../base/Context/apiProvider";

const UserGiftTable = () => {
  const [getUserGift, setGetUserGift] = useState([]);
  const [showGiftIcon, setShowGiftIcon] = useState(false);
  const [img, setImg] = useState("");
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");

  const loader = useLoader();
  const apiProvider = useApi();

  useEffect(() => {
    handleGift();
  }, [page, perPage]);

  const handleGiftIcon = (img) => {
    setShowGiftIcon(true);
    setImg(img);
  };

  const handleGiftIconClose = () => {
    setShowGiftIcon(false);
  };

  const handleGift = () => {
    loader.showLoader(true);

    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.GETUSERGIFT,
      "POST",
      {
        id: id,
        page,
        perPage,
      }
    )
      .then((res) => {
        setGetUserGift(res?.result);
        setTotalCount(res?.totalCount);
        setTotalPages(res?.totalPages);
        loader.showLoader(false);
      })
      .catch((err) => {
        console.log(err);
        loader.showLoader(false);
      });
  };

  return (
    <div className="user__gift__container">
      <table className="user__gift__table">
        <thead>
          <th className="user__gift__header">S.No.</th>
          <th className="user__gift__header">Gift Name</th>
          <th className="user__gift__header">Gift Image</th>
          <th className="user__gift__header">Price</th>
          <th className="user__gift__header">Host Name</th>
          <th className="user__gift__header">Date & Time</th>
        </thead>
        <tbody>
          {getUserGift && getUserGift.length > 0
            ? getUserGift.map((data, index) => {
                return (
                  <tr>
                    <td className="user__gift__data">{index + 1}</td>
                    <td className="user__gift__data">{data?.name}</td>
                    <td className="user__gift__data">
                      <AiFillEye
                        className="user__gift__icon"
                        onClick={() => {
                          handleGiftIcon(data?.sendGiftId?.giftUrl);
                        }}
                      />
                    </td>
                    <td className="user__gift__data">{data?.pice}</td>
                    <td className="user__gift__data">{data?.hostId?.name}</td>
                    <td className="user__gift__data">
                      {moment(data?.createdAt).format("DD/MM/YYYY , LT")}
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>

      {getUserGift.length > 0 ? (
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

      <ImagePopUpModal
        open={showGiftIcon}
        handleClose={handleGiftIconClose}
        img={img}
      />
    </div>
  );
};

export default UserGiftTable;
