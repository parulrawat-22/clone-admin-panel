import { useState } from "react";
import { useLoader } from "../../../base/Context/loaderProvider";
import { NetworkConfiguration } from "../../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import { errorToast, successToast } from "../../../utils/toast";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";
import { useApi } from "../../../base/Context/apiProvider";

const FlowerForm = ({ flowerData, onSubmit }) => {
  const loader = useLoader();
  const [name, setName] = useState(flowerData.name);
  const [price, setPrice] = useState(flowerData.price);
  const [image, setImage] = useState("");
  const apiProvider = useApi();

  const handleEditForm = () => {
    loader.showLoader(true);
    let data = {
      name,
      price,
      image,
    };
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.UPDATEFLOWER,
      "PUT",
      data,
      {
        "Content-Type": "multipart/form-data",
      }
    )
      .then((res) => {
        loader.showLoader(false);
        console.log(res);
        onSubmit();
        successToast(res?.message);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
        errorToast(err?.message);
      });
  };
  return (
    <div className="add__gift__container">
      <h2 className="add__gift__heading">Update Flower</h2>
      <div className="add__gift__form">
        <InputField value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <InputField
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
        />
        <br />

        <InputField type="file" onChange={(e) => setImage(e.target.files[0])} />
        <br />
        <Button
          className="add__gift__form__btn"
          text="Update"
          onClick={handleEditForm}
        />
      </div>
    </div>
  );
};

export default FlowerForm;
