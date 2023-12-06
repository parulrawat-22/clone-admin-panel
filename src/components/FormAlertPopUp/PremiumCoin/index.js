import { useState } from "react";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";
import { useLoader } from "../../../base/Context/loaderProvider";

const PremiumCoin = () => {
  const [premiumCoins, setPremiumCoins] = useState("");

  const loader = useLoader();

  const handleSetPremiumCoin = () => {
    loader.showLoader(true);
    fetchDataFromAPI(API_URL + NetworkConfiguration.UPDATEPREMIUMCOINS, "PUT", {
      setPostCoins: premiumCoins,
    })
      .then((res) => {
        loader.showLoader(false);
        console.log(res);
        // onSubmit();
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  return (
    <div className="premium__coin__container">
      <h2 className="premium__coin__heading">Set Premium Coins</h2>
      <div className="premium__coin">
        <InputField
          placeholder="Set Coins"
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
    </div>
  );
};

export default PremiumCoin;
