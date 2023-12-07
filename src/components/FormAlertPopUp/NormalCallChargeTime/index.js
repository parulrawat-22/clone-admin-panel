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

const NormalCallTime = ({ onSubmit }) => {
  const [normalCallTime, setNormalCallTime] = useState("");

  const loader = useLoader();

  useEffect(() => {
    fetchNormalCallTime();
  }, []);

  const fetchNormalCallTime = () => {
    loader.showLoader(true);
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETNORMALCALLTIME, "GET")
      .then((res) => {
        console.log(res);
        loader.showLoader(false);
        setNormalCallTime(res.result);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  const handleNormalCallTime = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.UPDATENORMALCALLTIME,
      "PUT",
      {
        perSecondCharge: normalCallTime,
      }
    )
      .then((res) => {
        console.log(res);
        loader.showLoader(false);
        onSubmit();
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };
  return (
    <div className="premium__coin__container">
      <h2 className="premium__coin__heading">Set Normal Call Charges</h2>
      <div className="premium__coin">
        <InputField
          value={normalCallTime}
          placeholder="Set Normal Call Time in sec"
          onChange={(e) => {
            setNormalCallTime(e.target.value);
          }}
        />
        <br />
        <Button
          onClick={handleNormalCallTime}
          text="Update"
          style={{ margin: "auto" }}
        />
      </div>
    </div>
  );
};

export default NormalCallTime;
