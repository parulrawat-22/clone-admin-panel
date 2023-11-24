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
import ImagePopUpModal from "../../ImagePopUpModal";
import AlertPopUp from "../../AlertPopUp";

const StickerTable = () => {
  const [getSticker, setGetSticker] = useState([]);
  const [img, setImg] = useState("");
  const [showImageAlert, setShowImageAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [id, setId] = useState("");

  const handleDeleteAlert = () => {
    setShowDeleteAlert(true);
  };

  const handleDeleteAlertClose = () => {
    setShowDeleteAlert(false);
  };

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

  const handleEyeOnClick = (img) => {
    setImg(img);
    setShowImageAlert(true);
  };

  const handleEyeOnClickClose = () => {
    setShowImageAlert(false);
  };

  const handleOnClickAlert = (id) => {
    setId(id);
    setShowDeleteAlert(true);
  };

  const handleDeleteApi = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.DELETESTICKER + `/${id}`,
      "DELETE"
    )
      .then((res) => {
        setShowDeleteAlert(false);
        fetchSticker();
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
                  <AiFillEye
                    className="sticker__table__eye__icon"
                    onClick={() => {
                      handleEyeOnClick(data?.stickerUrl);
                    }}
                  />
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
                  <AiFillEdit className="sticker__table__edit__icon" />
                  <AiFillDelete
                    onClick={() => {
                      handleOnClickAlert(data?._id);
                    }}
                    className="sticker__table__delete__icon"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ImagePopUpModal
        open={showImageAlert}
        handleClose={handleEyeOnClickClose}
        img={img}
      />

      <AlertPopUp
        open={showDeleteAlert}
        handleOpen={handleDeleteAlert}
        handleClose={handleDeleteAlertClose}
        header="Delete Alert"
        description="Are you sure you want to delete this sticker"
        submitText="Yes"
        cancelText="No"
        onSubmitClick={handleDeleteApi}
        onCancelClick={handleDeleteAlertClose}
      />
    </div>
  );
};

export default StickerTable;
