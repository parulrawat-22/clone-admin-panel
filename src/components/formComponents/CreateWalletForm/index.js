import { useState } from "react";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";

const CreateWalletForm = ({ onSubmit }) => {
  const [coins, setCoins] = useState("");
  const [price, setPrice] = useState("");
  const [offer, setOffer] = useState("");
  const [error, setError] = useState({
    coinError: "",
    priceError: "",
    offerError: "",
  });

  const handleCreateCoin = () => {
    if (validate()) {
      fetchDataFromAPI(API_URL + NetworkConfiguration.UPDATEWALLET, "POST", {
        coins,
        price,
        offer,
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

  const handleCoin = (e) => {
    setError({ ...error, coinError: "" });
    setCoins(e.target.value);
  };

  const handlePrice = (e) => {
    setError({ ...error, price: "" });
    setPrice(e.target.value);
  };

  const validate = () => {
    let result = true;
    if (!coins) {
      setError({ ...error, coinError: "Number of coins is required" });
      result = false;
    } else if (!price) {
      setError({ ...error, priceError: "Price is required" });
      result = false;
    }
    return result;
  };

  return (
    <div>
      <InputField type="number" onChange={handleCoin} placeholder="Coin" />
      <br />
      <InputField type="number" onChange={handlePrice} placeholder="Price" />
      <br />
      <InputField
        type="number"
        onChange={(e) => {
          setOffer(e.target.value);
        }}
        placeholder="Offer Price"
      />
      <br />
      <Button
        onClick={handleCreateCoin}
        className="create__wallet__btn"
        text="Done"
      />
    </div>
  );
};

export default CreateWalletForm;
