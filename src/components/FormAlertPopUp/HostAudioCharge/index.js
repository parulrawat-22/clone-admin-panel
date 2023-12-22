import { useEffect, useState } from "react";
import { useLoader } from "../../../base/Context/loaderProvider";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";
import { useApi } from "../../../base/Context/apiProvider";

const HostAudioCharge = ({ id, getAcceptedHost, setShowAudioAlert }) => {
  const [audioCallFees, setAudioCallFees] = useState("");

  const loader = useLoader();
  const apiProvider = useApi();

  useEffect(() => {
    fetchHostAudioCharge();
  }, [apiProvider?.apiUrl]);

  const fetchHostAudioCharge = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.GETHOSTAUDIOCHARGE + `/${id}`,
      "GET"
    )
      .then((res) => {
        console.log(res);
        setAudioCallFees(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAudioCharges = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.UPDATEAUDIOCALLCHARGE,
      "PUT",
      {
        id: id,
        audioCall_fees: audioCallFees,
      }
    )
      .then((res) => {
        console.log(res);
        loader.showLoader(false);
        getAcceptedHost();
        setShowAudioAlert(false);
      })
      .catch((err) => {
        console.log(err);
        loader.showLoader(false);
      });
  };
  return (
    <div className="premium__coin__container">
      <h2 className="premium__coin__heading">Set Audio Charge(per second)</h2>
      <div className="premium__coin">
        <InputField
          value={audioCallFees}
          placeholder="Set Random Call Time in sec"
          onChange={(e) => {
            setAudioCallFees(e.target.value);
          }}
        />
        <br />
        <Button
          onClick={handleAudioCharges}
          text="Update"
          style={{ margin: "auto" }}
        />
      </div>
    </div>
  );
};

export default HostAudioCharge;
