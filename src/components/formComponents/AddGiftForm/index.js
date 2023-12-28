import { useEffect, useState } from "react";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";
import { errorToast, successToast } from "../../../utils/toast";
import { useLoader } from "../../../base/Context/loaderProvider";
import { useApi } from "../../../base/Context/apiProvider";

const AddGiftForm = ({ onSubmit, edit, onClickEdit, editedGift }) => {
  const [giftName, setGiftName] = useState("");
  const [giftPrice, setGiftPrice] = useState("");
  const [giftUploadImage, setGiftUploadImage] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState({
    id: "",
    name: "",
    price: "",
    uploadImage: "",
  });

  const loader = useLoader();
  const apiProvider = useApi();
  console.log(apiProvider);

  useEffect(() => {
    if (edit && editedGift) {
      setGiftData(
        editedGift?.giftId,
        editedGift?.giftName,
        editedGift?.giftPrice,
        editedGift?.giftImage
      );
    }
  }, [edit]);

  const setGiftData = (giftId, giftName, giftPrice, giftImage) => {
    setId(giftId);
    setGiftName(giftName);
    setGiftPrice(giftPrice);
    setGiftUploadImage(giftImage);
  };

  const handleGiftForm = () => {
    let data = new FormData();
    data.append("name", giftName);
    data.append("price", giftPrice);
    data.append("image", giftUploadImage);
    if (validate()) {
      fetchDataFromAPI(
        apiProvider?.apiUrl + NetworkConfiguration.ADDGIFT,
        "POST",
        data,
        {
          "Content-Type": "multipart/form-data",
        }
      )
        .then((res) => {
          console.log(res);
          successToast(res.message);
          onSubmit();
        })
        .catch((err) => {
          errorToast(err.message);
          console.log(err);
        });
    }
  };

  const handleEditForm = () => {
    let data = new FormData();
    data.append("name", giftName);
    data.append("price", giftPrice);
    data.append("image", giftUploadImage);
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.UPDATEGIFT + `/${id}`,
      "PUT",
      data,
      {
        "Content-Type": "multipart/form-data",
      }
    )
      .then((res) => {
        loader.showLoader(false);
        console.log(res);
        successToast("Gift updated successfully");
        onClickEdit();
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
        errorToast(err.message);
      });
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
      {edit ? (
        <h2 className="add__gift__heading">Update Gift</h2>
      ) : (
        <h2 className="add__gift__heading">Add Gift</h2>
      )}
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
          text={edit ? "Update" : "Save"}
          onClick={edit ? handleEditForm : handleGiftForm}
        />
      </div>
    </div>
  );
};

export default AddGiftForm;
