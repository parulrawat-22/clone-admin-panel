import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";

const UserGiftTable = () => {
  const [getUserGift, setGetUserGift] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    handleGift();
  }, []);

  const handleGift = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETGIFT + `/${id}`, "GET")
      .then((res) => {
        setGetUserGift(res?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="user__gift__container">
      <table className="user__gift__table">
        <thead>
          <th className="user__gift__header">S.No.</th>
          <th className="user__gift__header">Gift Name</th>
          <th className="user__gift__header">Gift Image</th>
          <th className="user__gift__header">Host Name</th>
          <th className="user__gift__header">Created At</th>
        </thead>
        <tbody>
          {getUserGift.map((data, index) => {
            return (
              <tr>
                <td className="user__gift__data">{index + 1}</td>
                <td className="user__gift__data">{data?.giftName}</td>
                <td className="user__gift__data">{data?.image}</td>
                <td className="user__gift__data">{data?.name}</td>
                <td className="user__gift__data">{data?.createdAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserGiftTable;
