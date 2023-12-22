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

export const SetRandomCallTime = ({ onSubmit }) => {
  const [randomCallTime, setRandomCallTime] = useState("");

  const loader = useLoader();
  const apiProvider = useApi();

  useEffect(() => {
    fetchRandomCallTime();
  }, [apiProvider?.apiUrl]);

  const fetchRandomCallTime = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.GETRANDOMCALLTIME,
      "GET"
    )
      .then((res) => {
        console.log(res);
        loader.showLoader(false);

        setRandomCallTime(res.result);
      })
      .catch((err) => {
        loader.showLoader(false);

        console.log(err);
      });
  };
  const handleRandomCallTime = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.UPDATERANDOMCALLTIME,
      "PUT",
      {
        randomCallSecondTime: randomCallTime,
      }
    )
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
      <h2 className="premium__coin__heading">Set Random Call Time</h2>
      <div className="premium__coin">
        <InputField
          value={randomCallTime}
          placeholder="Set Random Call Time in sec"
          onChange={(e) => {
            setRandomCallTime(e.target.value);
          }}
        />
        <br />
        <Button
          onClick={handleRandomCallTime}
          text="Update"
          style={{ margin: "auto" }}
        />
      </div>
    </div>
  );
};
