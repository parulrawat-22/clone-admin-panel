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

const HostGiftTable = () => {
  const [getHostGift, setGetHostGift] = useState([]);
  const [showGiftIcon, setShowGiftIcon] = useState(false);
  const [img, setImg] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetchHostGift();
  }, []);

  const fetchHostGift = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETHOSTGIFT, "POST", {
      id: id,
    })
      .then((res) => {
        setGetHostGift(res.result);
      })
      .catch((err) => {
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

  return (
    <div className="host__gift__container">
      <table className="host__gift__table">
        <thead>
          <th className="host__gift__header">S.No.</th>
          <th className="host__gift__header">Gift Name</th>
          <th className="host__gift__header">Gift Image</th>
          <th className="host__gift__header">Price</th>
          <th className="host__gift__header">User Name</th>
          <th className="host__gift__header">Date & Time</th>
        </thead>
        <tbody>
          {getHostGift.map((data, index) => {
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
                <td className="host__gift__data">
                  {moment(data?.createdAt).format("DD/MM/YYYY, LT")}
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

export default HostGiftTable;
