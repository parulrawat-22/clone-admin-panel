import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import "./style.css";
import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import moment from "moment";
import Button from "../../library/Button";

const StickerTable = () => {
  const [getSticker, setGetSticker] = useState([]);

  useEffect(() => {
    fetchSticker();
  }, []);

  const fetchSticker = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETSTICKER, "GET")
      .then((res) => {
        setGetSticker(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sticker__container">
      <div className="add__sticker">
        <Button text="Add Sticker" />
      </div>
      <table className="sticker__table">
        <thead>
          <th className="sticker__table__heading">S.No</th>
          <th className="sticker__table__heading">Sticker Name</th>
          <th className="sticker__table__heading">Sticker Image</th>
          <th className="sticker__table__heading">Sticker Price</th>
          <th className="sticker__table__heading">Offer Price</th>
          <th className="sticker__table__heading">Created At</th>
          <th className="sticker__table__heading">Updated At</th>
          <th className="sticker__table__heading">Action</th>
        </thead>
        <tbody>
          {getSticker.map((data, index) => {
            return (
              <tr>
                <td className="sticker__table__data">{index + 1}</td>
                <td className="sticker__table__data">{data?.name}</td>
                <td className="sticker__table__data">
                  <AiFillEye />
                </td>
                <td className="sticker__table__data">{data?.price}</td>
                <td className="sticker__table__data">{data?.offer}</td>
                <td className="sticker__table__data">
                  {moment(data?.createdAt).format("DD/MM/YYYY LT")}
                </td>
                <td className="sticker__table__data">
                  {moment(data?.updatedAt).format("DD/MM/YYYY LT")}
                </td>
                <td className="sticker__table__data">
                  <AiFillEdit />
                  <AiFillDelete />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StickerTable;
