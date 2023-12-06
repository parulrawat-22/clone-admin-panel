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

const Helpline = ({ helplineNumber, onSubmit }) => {
  const [mobileNumber, setMobileNumber] = useState(helplineNumber);
  const [id, setId] = useState("");

  const loader = useLoader();

  useEffect(() => {
    console.log("cfgfjyul", helplineNumber);
    setMobileNumber(helplineNumber);
  }, [helplineNumber]);

  const handleHelpline = () => {
    loader.showLoader(true);

    fetchDataFromAPI(API_URL + NetworkConfiguration.ADDHELPLINE, "POST", {
      mobileNumber: mobileNumber,
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

  const handleCreateHelpline = () => {
    loader.showLoader(true);

    fetchDataFromAPI(
      API_URL + NetworkConfiguration.UPDATEHELPLINE + `/${id}`,
      "PUT",
      {
        mobileNumber: mobileNumber,
      }
    )
      .then((res) => {
        loader.showLoader(false);

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
          onClick={helplineNumber ? handleCreateHelpline : handleHelpline}
          text={helplineNumber ? "Update" : "Create"}
        />
      </div>
    </div>
  );
};

export default Helpline;
