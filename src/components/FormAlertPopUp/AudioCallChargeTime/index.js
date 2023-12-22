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

const AudioChargeCall = ({ onSubmit }) => {
  const [audioCallChargeTime, setAudioCallChargeTime] = useState("");

  const loader = useLoader();
  const apiProvider = useApi();

  useEffect(() => {
    fetchAudioCallTime();
  }, [apiProvider?.apiUrl]);

  const fetchAudioCallTime = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.GETAUDIOCALLTIME,
      "GET"
    )
      .then((res) => {
        setAudioCallChargeTime(res.result);
        loader.showLoader(false);
      })
      .catch((err) => {
        console.log(err);
        loader.showLoader(false);
      });
  };

  const handleAudioCallTime = () => {
    loader.showLoader(true);

    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.UPDATEAUDIOCALLTIME,
      "PUT",
      {
        audioCallTimeset: audioCallChargeTime,
      }
    )
      .then((res) => {
        onSubmit();
        loader.showLoader(false);

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        loader.showLoader(false);
      });
  };
  return (
    <div className="premium__coin__container">
      <h2 className="premium__coin__heading">Set Audio Call Charge Time</h2>
      <div className="premium__coin">
        <InputField
          value={audioCallChargeTime}
          placeholder="Set Random Call Time in sec"
          onChange={(e) => {
            setAudioCallChargeTime(e.target.value);
          }}
        />
        <br />
        <Button
          onClick={handleAudioCallTime}
          text="Update"
          style={{ margin: "auto" }}
        />
      </div>
    </div>
  );
};

export default AudioChargeCall;
