import { useEffect, useState } from "react";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { errorToast, successToast } from "../../../utils/toast";

const StickerForm = ({ onSubmit, edit, editedSticker, onClickEdit, id }) => {
  const [stickerName, setStickerName] = useState("");
  const [stickerPrice, setStickerPrice] = useState("");
  const [stickerImage, setStickerImage] = useState("");
  // const [id, setId] = useState("");
  const [error, setError] = useState({
    name: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    if (edit && editedSticker) {
      setStickerData(editedSticker?.name, editedSticker?.price);
    }
  }, [edit]);

  const setStickerData = (stickerName, stickerPrice, stickerImage) => {
    setStickerName(stickerName);
    setStickerPrice(stickerPrice);
    setStickerImage(stickerImage);
  };

  const handleStickerName = (e) => {
    setError({ ...error, name: "" });
    setStickerName(e.target.value);
  };

  const handleStickerPrice = (e) => {
    setError({ ...error, price: "" });
    setStickerPrice(e.target.value);
  };

  const handleStickerImage = (e) => {
    setError({ ...error, image: "" });
    setStickerImage(e.target.files[0]);
  };

  const validate = () => {
    let result = true;
    if (!stickerName) {
      setError({ ...error, name: "Enter valid Sticker Name" });
      result = false;
    } else if (!stickerPrice) {
      setError({ ...error, price: "Enter valid Sticker Price" });
      result = false;
    } else if (!stickerImage) {
      setError({ ...error, image: "Upload Sticker Image" });
      result = false;
    }
    return result;
  };

  const handleEditForm = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.UPDATESTICKER + `/${id}`,
      "PUT",
      {
        name: stickerName,
        price: stickerPrice,
      }
    )
      .then((res) => {
        onClickEdit();
        console.log(res);
        successToast(res.message);
      })
      .catch((err) => {
        console.log(err);
        errorToast(err.message);
      });
  };

  const handleStickerForm = () => {
    if (validate()) {
      let data = new FormData();
      data.append("name", stickerName);
      data.append("price", stickerPrice);
      data.append("image", stickerImage);
      console.log(stickerImage, "12345");
      fetchDataFromAPI(
        API_URL + NetworkConfiguration.ADDSTICKER,
        "POST",
        data,
        {
          "Content-Type": "multipart/form-data",
        }
      )
        .then((res) => {
          console.log(res);
          onSubmit();
          successToast(res.message);
        })
        .catch((err) => {
          console.log(err);
          errorToast(err.message);
        });
    }
  };

  return (
    <div className="sticker__form__container">
      {edit ? (
        <h2 className="sticker__form__header">Update Sticker</h2>
      ) : (
        <h2 className="sticker__form__header">Add Sticker</h2>
      )}
      <div className="sticker__form">
        <InputField
          value={stickerName}
          onChange={handleStickerName}
          placeholder="Sticker Name"
          error={error.name}
        />
        <br />
        <InputField
          value={stickerPrice}
          onChange={handleStickerPrice}
          placeholder="Sticker Price"
          error={error.price}
        />
        <br />
        <InputField
          onChange={handleStickerImage}
          type="file"
          placeholder="Sticker Image"
          error={error.image}
        />
        <br />
        <Button
          onClick={edit ? handleEditForm : handleStickerForm}
          className="sticker__submit__btn"
          text={edit ? "Update" : "Submit"}
        />
      </div>
    </div>
  );
};

export default StickerForm;
