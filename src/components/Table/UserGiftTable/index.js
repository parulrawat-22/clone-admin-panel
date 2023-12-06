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

const UserGiftTable = () => {
  const [getUserGift, setGetUserGift] = useState([]);
  const [showGiftIcon, setShowGiftIcon] = useState(false);
  const [img, setImg] = useState("");
  const { id } = useParams();

  const loader = useLoader();

  useEffect(() => {
    handleGift();
  }, []);

  const handleGiftIcon = (img) => {
    setShowGiftIcon(true);
    setImg(img);
  };

  const handleGiftIconClose = () => {
    setShowGiftIcon(false);
  };

  const handleGift = () => {
    loader.showLoader(true);

    fetchDataFromAPI(API_URL + NetworkConfiguration.GETUSERGIFT, "POST", {
      id: id,
    })
      .then((res) => {
        setGetUserGift(res?.result);
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
          {getUserGift.map((data, index) => {
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
          })}
        </tbody>
      </table>

      <ImagePopUpModal
        open={showGiftIcon}
        handleClose={handleGiftIconClose}
        img={img}
      />
    </div>
  );
};

export default UserGiftTable;
