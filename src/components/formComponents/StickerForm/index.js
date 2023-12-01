import { useState } from "react";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";

const StickerForm = ({ onSubmit }) => {
  const [stickerName, setStickerName] = useState("");
  const [stickerPrice, setStickerPrice] = useState("");
  const [stickerImage, setStickerImage] = useState("");
  const [error, setError] = useState({
    name: "",
    price: "",
    image: "",
  });

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
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="sticker__form__container">
      <h2 className="sticker__form__header">Add Sticker</h2>
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
          onClick={handleStickerForm}
          className="sticker__submit__btn"
          text="Submit"
        />
      </div>
    </div>
  );
};

export default StickerForm;
