import { useState } from "react";
import { useLoader } from "../../../base/Context/loaderProvider";
import { NetworkConfiguration } from "../../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import { errorToast, successToast } from "../../../utils/toast";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";
import { useApi } from "../../../base/Context/apiProvider";

const FlowerForm = ({ flowerData, fetchFlowerData }) => {
  const loader = useLoader();
  const [giftName, setGiftName] = useState("");
  const [giftPrice, setGiftPrice] = useState("");
  const [giftUploadImage, setGiftUploadImage] = useState("");
  const [id, setId] = useState("");
  const apiProvider = useApi();

  const handleEditForm = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.UPDATEGIFT,
      "PUT",
      {
        id,
        name: giftName,
        price: giftPrice,
      }
    )
      .then((res) => {
        loader.showLoader(false);
        console.log(res);
        successToast("Gift updated successfully");
        fetchFlowerData();
      })
      .catch((err) => {
        loader.showLoader(false);

        console.log(err);
        errorToast(err.message);
      });
  };
  return (
    <div className="add__gift__container">
      <h2 className="add__gift__heading">Update Flower</h2>
      <div className="add__gift__form">
        <InputField
          value={giftName}
          onChange={(e) => setGiftName(e.target.value)}
        />
        <br />
        <InputField
          value={giftPrice}
          onChange={(e) => setGiftPrice(e.target.value)}
          type="number"
        />
        <br />

        <InputField
          value={giftUploadImage}
          type="file"
          onChange={(e) => setGiftUploadImage(e.target.files[0])}
        />
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
