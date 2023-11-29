import { useState } from "react";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";

const PremiumCoin = ({ onSubmit }) => {
  const [premiumCoins, setPremiumCoins] = useState("");

  const handleSetPremiumCoin = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.UPDATEPREMIUMCOINS, "PUT", {
      setPostCoins: premiumCoins,
    })
      .then((res) => {
        console.log(res);
        onSubmit();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2 className="premium__coin__heading">Set Premium Coins</h2>
      <InputField
        onChange={(e) => {
          setPremiumCoins(e.target.value);
        }}
      />
      <br />
      <Button
        onClick={handleSetPremiumCoin}
        text="Update"
        style={{ margin: "auto" }}
      />
    </div>
  );
};

export default PremiumCoin;
