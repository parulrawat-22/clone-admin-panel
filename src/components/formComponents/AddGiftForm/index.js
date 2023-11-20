import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";

const AddGiftForm = () => {
  const handleGiftForm = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.ADDGIFT, "POST", {})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <InputField placeholder="Gift Name" />
      <br />
      <InputField placeholder="Gift Price" />
      <br />

      <InputField placeholder="Offer Price" />
      <br />

      <InputField placeholder="Upload Image" />
      <br />
      <div className="add" style={{ display: "flex", gap: "20px" }}>
        <Button
          className="add__gift__form__btn"
          text="Save"
          onClick={handleGiftForm}
        />
        <Button className="add__gift__form__btn" text="Cancel" />
      </div>
    </div>
  );
};

export default AddGiftForm;
