import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";
import { useEffect, useState } from "react";
import { useLoader } from "../../../base/Context/loaderProvider";

const RandomCallCharge = ({ onSubmit }) => {
  const [randomCallCharge, setRandomCallCharge] = useState("");

  const loader = useLoader();

  useEffect(() => {
    handleSetRandomCallCharge();
  }, []);

  const handleSetRandomCallCharge = () => {
    loader.showLoader(true);
    fetchDataFromAPI(API_URL + NetworkConfiguration.RANDOMCALLCHARGE, "GET")
      .then((res) => {
        loader.showLoader(false);
        console.log(res);
        setRandomCallCharge(res.result);
      })
      .catch((err) => {
        console.log(err);
        loader.showLoader(false);
      });
  };

  const handleEditChargeCoin = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.UPDATERANDOMCOINS, "PUT", {
      randomCallCoins: randomCallCharge,
    })
      .then((res) => {
        onSubmit();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="premium__coin__container">
      <h2 className="premium__coin__heading">Set Random Call Charge</h2>
      <div className="premium__coin">
        <InputField
          value={randomCallCharge}
          placeholder="Set Random Call Time in sec"
          onChange={(e) => {
            setRandomCallCharge(e.target.value);
          }}
        />
        <br />
        <Button
          onClick={handleEditChargeCoin}
          text="Update"
          style={{ margin: "auto" }}
        />
      </div>
    </div>
  );
};

export default RandomCallCharge;
