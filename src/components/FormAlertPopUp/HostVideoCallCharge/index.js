import { useEffect, useState } from "react";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useLoader } from "../../../base/Context/loaderProvider";
import { useApi } from "../../../base/Context/apiProvider";

const HostVideoCallCharge = ({ id, getAcceptedHost, setShowChargeAlert }) => {
  // const [videoCallCharge, setVideoCallCharge] = useState("");
  const [hostuser_fees, setHostuser_fees] = useState("");
  const loader = useLoader();
  const apiProvider = useApi();

  useEffect(() => {
    fetchVideoCallCharge();
  }, [apiProvider?.apiUrl]);

  const fetchVideoCallCharge = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.GETVIDEOCALLBALANCE + `/${id}`,
      "GET"
    )
      .then((res) => {
        console.log(res);
        setHostuser_fees(res.result);
        loader.showLoader(false);
      })
      .catch((err) => {
        console.log(err);
        loader.showLoader(false);
      });
  };

  const handleHostLeader = () => {
    console.log("object");
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.UPDATEHOSTVIDEOFEES + `/${id}`,
      "PUT",
      {
        hostuser_fees: hostuser_fees,
      }
    )
      .then((res) => {
        getAcceptedHost();
        setShowChargeAlert(false);
        loader.showLoader(false);
      })
      .catch((err) => {
        console.log(err, "2345");
        loader.showLoader(false);
      });
  };

  return (
    <div className="premium__coin__container">
      <h2 className="premium__coin__heading">Set Video Charge(per second)</h2>
      <div className="premium__coin">
        <InputField
          value={hostuser_fees}
          placeholder="Set Random Call Time in sec"
          onChange={(e) => {
            setHostuser_fees(e.target.value);
          }}
        />
        <br />
        <Button
          onClick={handleHostLeader}
          text="Update"
          style={{ margin: "auto" }}
        />
      </div>
    </div>
  );
};

export default HostVideoCallCharge;
