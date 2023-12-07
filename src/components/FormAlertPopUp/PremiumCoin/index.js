import { useEffect, useState } from "react";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";
import { useLoader } from "../../../base/Context/loaderProvider";

const PremiumCoin = ({ onSubmit }) => {
  const [premiumCoins, setPremiumCoins] = useState("");
  const [edit, setEdit] = useState(false);

  const loader = useLoader();

  useEffect(() => {
    fetchPremiumCoin();
  }, []);

  const fetchPremiumCoin = () => {
    loader.showLoader(true);
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETPREMIUMCOINS, "GET")
      .then((res) => {
        console.log("123456789", res);
        setPremiumCoins(res.setPostCoins);
        loader.showLoader(false);
        setEdit(true);
      })
      .catch((err) => {
        setEdit(false);
        loader.showLoader(false);
        console.log(err);
      });
  };

  const handleSetPremiumCoin = () => {
    loader.showLoader(true);
    fetchDataFromAPI(API_URL + NetworkConfiguration.UPDATEPREMIUMCOINS, "PUT", {
      setPostCoins: premiumCoins,
    })
      .then((res) => {
        loader.showLoader(false);
        console.log(res);
        onSubmit();
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
          value={premiumCoins}
          placeholder="Set Coins"
          onChange={(e) => {
            setPremiumCoins(e.target.value);
          }}
        />
        <br />
        <Button
          onClick={handleSetPremiumCoin}
          text={edit ? "Update" : "Add"}
          style={{ margin: "auto" }}
        />
      </div>
    </div>
  );
};

export default PremiumCoin;
