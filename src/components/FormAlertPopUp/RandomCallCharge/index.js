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
import { useApi } from "../../../base/Context/apiProvider";

const RandomCallCharge = ({ onSubmit }) => {
  const [randomCallCharge, setRandomCallCharge] = useState("");

  const loader = useLoader();
  const apiProvider = useApi();

  useEffect(() => {
    handleSetRandomCallCharge();
  }, [apiProvider?.apiUrl]);

  const handleSetRandomCallCharge = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.RANDOMCALLCHARGE,
      "GET"
    )
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
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.UPDATERANDOMCOINS,
      "PUT",
      {
        randomCallCoins: randomCallCharge,
      }
    )
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
