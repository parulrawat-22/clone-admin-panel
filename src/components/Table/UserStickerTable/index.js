import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";

const UserStickerTable = () => {
  const [getUserSticker, setGetUserSticker] = useState([]);

  useEffect(() => {
    fetchUserSticker();
  }, []);

  const fetchUserSticker = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETONESTICKER, "GET")
      .then((res) => {
        setGetUserSticker(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="user__sticker__container">
      <table className="user__sticker__table">
        <thead>
          <th className="user__sticker__header">S.No.</th>
          <th className="user__sticker__header">Sticker Name</th>
          <th className="user__sticker__header">Host Name</th>
          <th className="user__sticker__header">Sticker Image</th>
          <th className="user__sticker__header">Created At</th>
        </thead>
        <tbody>
          {getUserSticker.map((index, data) => {
            return (
              <tr>
                <td className="user__sticker__data">{index + 1}</td>
                <td className="user__sticker__data">{data?.stickerName}</td>
                <td className="user__sticker__data">{data?.name}</td>
                <td className="user__sticker__data">{data?.image}</td>
                <td className="user__sticker__data">{data?.createdAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserStickerTable;
