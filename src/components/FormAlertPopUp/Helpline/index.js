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
import { useApi } from "../../../base/Context/apiProvider";

const Helpline = ({ helplineNumber, onSubmit }) => {
  const [mobileNumber, setMobileNumber] = useState("");

  const loader = useLoader();
  const apiProvider = useApi();

  useEffect(() => {
    fetchHelplineNumber();
  }, [apiProvider?.apiUrl]);

  const fetchHelplineNumber = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.GETHELPLINENUMBER,
      "GET"
    )
      .then((res) => {
        loader.showLoader(false);
        setMobileNumber(res.result);
      })
      .catch((err) => {
        console.log(err);
        loader.showLoader(false);
      });
  };

  const handleCreateHelpline = () => {
    loader.showLoader(true);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.UPDATEHELPLINE,
      "PUT",
      {
        mobileNumber: mobileNumber,
      }
    )
      .then((res) => {
        loader.showLoader(false);
        onSubmit();
        console.log(res);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  return (
    <div className="helpline__container">
      <h2 className="helpline__header" style={{ textAlign: "center" }}>
        Helpline Number
      </h2>
      <div className="helpline__content">
        <InputField
          value={mobileNumber}
          onChange={(e) => {
            setMobileNumber(e.target.value);
          }}
        />
        <br />
        <Button
          style={{ margin: "auto", cursor: "pointer" }}
          onClick={handleCreateHelpline}
          text={helplineNumber ? "Update" : "Create"}
        />
      </div>
    </div>
  );
};

export default Helpline;
