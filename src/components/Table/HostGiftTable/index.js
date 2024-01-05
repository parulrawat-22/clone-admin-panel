import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import moment from "moment";
import { AiFillEye } from "react-icons/ai";
import { useParams } from "react-router-dom";
import ImagePopUpModal from "../../ImagePopUpModal";
import { useLoader } from "../../../base/Context/loaderProvider";
import Pagination from "../../Pagination";
import Lottie from "react-lottie";
import noData from "../../../base/Animation/No Data Found.json";
import { useApi } from "../../../base/Context/apiProvider";
import SearchInput from "../../SearchInput";
import { FiSearch } from "react-icons/fi";

const HostGiftTable = () => {
  const [getHostGift, setGetHostGift] = useState([]);
  const [showGiftIcon, setShowGiftIcon] = useState(false);
  const [img, setImg] = useState("");
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [value, setValue] = useState("");

  const loader = useLoader();
  const apiProvider = useApi();

  useEffect(() => {
    fetchHostGift();
  }, [page, perPage, apiProvider?.apiUrl]);

  const fetchHostGift = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.GETHOSTGIFT,
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
        setGetHostGift(res.result);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  const handleGiftIcon = (img) => {
    setShowGiftIcon(true);
    setImg(img);
  };

  const handleGiftIconClose = () => {
    setShowGiftIcon(false);
  };

  const handleText = (e) => {
    setValue(e.target.value);
  };

  const searchIcon = () => {
    return <FiSearch />;
  };

  return (
    <>
      <SearchInput
        onChange={handleText}
        value={value}
        placeholder="Search"
        icon={searchIcon()}
      />
      <div className="host__gift__container">
        <table className="host__gift__table">
          <thead>
            <th className="host__gift__header">S.No.</th>
            <th className="host__gift__header">Gift Name</th>
            <th className="host__gift__header">Gift Image</th>
            <th className="host__gift__header">Price</th>
            <th className="host__gift__header">User Name</th>
            <th className="host__gift__header">App Type</th>
            <th className="host__gift__header">Date & Time</th>
          </thead>
          <tbody>
            {getHostGift && getHostGift.length > 0
              ? getHostGift.map((data, index) => {
                  return (
                    <tr>
                      <td className="host__gift__data">{index + 1}</td>
                      <td className="host__gift__data">{data?.name}</td>
                      <td className="host__gift__data">
                        <AiFillEye
                          onClick={() => {
                            handleGiftIcon(data?.giftUrl);
                          }}
                          className="host__gift__icon"
                        />
                      </td>
                      <td className="host__gift__data">{data?.price}</td>
                      <td className="host__gift__data">{data?.name}</td>
                      <td className="host__gift__data">{data?.appType}</td>
                      <td className="host__gift__data">
                        {moment(data?.createdAt).format("DD/MM/YYYY, LT")}
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>

        {getHostGift.length > 0 ? (
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

        <ImagePopUpModal
          open={showGiftIcon}
          handleClose={handleGiftIconClose}
          img={img}
        />
      </div>
    </>
  );
};

export default HostGiftTable;
