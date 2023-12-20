import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";

const EarningTable = () => {
  const [earningData, setEarningData] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetchEarningData();
  }, []);

  const fetchEarningData = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.HOSTEARNING, "POST", {
      id,
    })
      .then((res) => {
        setEarningData(res?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="earnings__table__container">
      <table className="earnings__table">
        <thead>
          <th className="earnings__table__header">Video Call</th>
          <th className="earnings__table__header">Audio Call</th>
          <th className="earnings__table__header">Premium Post</th>
          <th className="earnings__table__header">Gifts</th>
          <th className="earnings__table__header">Video Call Gifts</th>
          <th className="earnings__table__header">Stickers</th>
          <th className="earnings__table__header">Total Earnings</th>
        </thead>
        <tbody>
          <tr>
            <td className="earnings__table__data">
              {earningData?.videoUserCoins}
            </td>
            <td className="earnings__table__data">{earningData?.audioCoins}</td>
            <td className="earnings__table__data">
              {earningData?.hostPostCoins}
            </td>
            <td className="earnings__table__data">{earningData?.giftCoins}</td>
            <td className="earnings__table__data">
              {earningData?.callCoinsGift}
            </td>
            <td className="earnings__table__data">
              {earningData?.stickerCoins}
            </td>
            <td className="earnings__table__data">
              {earningData?.host_balance}
            </td>
            {/* <td className="earnings__table__data">1</td> */}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EarningTable;
