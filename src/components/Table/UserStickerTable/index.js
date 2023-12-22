import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useLoader } from "../../../base/Context/loaderProvider";
import { useApi } from "../../../base/Context/apiProvider";

const UserStickerTable = () => {
  const [getUserSticker, setGetUserSticker] = useState([]);

  const loader = useLoader();
  const apiProvider = useApi();

  useEffect(() => {
    fetchUserSticker();
  }, [apiProvider?.apiUrl]);

  const fetchUserSticker = () => {
    loader.showLoader(true);

    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.GETONESTICKER,
      "GET"
    )
      .then((res) => {
        setGetUserSticker(res.result);
        loader.showLoader(false);
      })
      .catch((err) => {
        loader.showLoader(false);

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
