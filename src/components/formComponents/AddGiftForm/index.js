import { useState } from "react";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";

const AddGiftForm = ({ onSubmit }) => {
  const [giftName, setGiftName] = useState("");
  const [giftPrice, setGiftPrice] = useState("");
  const [giftUploadImage, setGiftUploadImage] = useState("");
  const [error, setError] = useState({
    name: "",
    price: "",
    uploadImage: "",
  });

  const handleGiftForm = () => {
    let data = new FormData();
    data.append("name", giftName);
    data.append("price", giftPrice);
    data.append("image", giftUploadImage);
    if (validate()) {
      fetchDataFromAPI(API_URL + NetworkConfiguration.ADDGIFT, "POST", data, {
        "Content-Type": "multipart/form-data",
      })
        .then((res) => {
          console.log(res);
          onSubmit();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleGiftName = (e) => {
    setError({ ...error, name: "" });
    setGiftName(e.target.value);
  };

  const handlePrice = (e) => {
    setError({ ...error, price: "" });
    setGiftPrice(e.target.value);
  };

  const handleImage = (e) => {
    setError({ ...error, uploadImage: "" });
    setGiftUploadImage(e.target.files[0]);
  };

  const validate = () => {
    let result = true;
    if (!giftName) {
      setError({ ...error, name: "Enter valid Gift Name" });
      result = false;
    } else if (!giftPrice) {
      setError({ ...error, price: "Enter valid Price" });
      result = false;
    } else if (!giftUploadImage) {
      setError({ ...error, uploadImage: "Upload Image" });
      result = false;
    }
    return result;
  };

  return (
    <div className="add__gift__container">
      <h2 className="add__gift__heading">Add Gift</h2>
      <div className="add__gift__form">
        <InputField
          value={giftName}
          onChange={handleGiftName}
          placeholder="Gift Name"
          error={error.name}
        />
        <br />
        <InputField
          value={giftPrice}
          onChange={handlePrice}
          type="number"
          placeholder="Gift Price"
          error={error.price}
        />
        <br />

        <InputField
          type="file"
          onChange={handleImage}
          placeholder="Upload Image"
          error={error.uploadImage}
        />
        <br />
        <Button
          className="add__gift__form__btn"
          text="Save"
          onClick={handleGiftForm}
        />
        {/* <Button className="add__gift__form__btn" text="Cancel" /> */}
      </div>
    </div>
  );
};

export default AddGiftForm;
