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

export const SetRandomCallTime = ({ onSubmit }) => {
  const [randomCallTime, setRandomCallTime] = useState("");

  const loader = useLoader();

  useEffect(() => {
    fetchRandomCallTime();
  }, []);

  const fetchRandomCallTime = () => {
    loader.showLoader(true);
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETRANDOMCALLTIME, "GET")
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
      API_URL + NetworkConfiguration.UPDATERANDOMCALLTIME,
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
