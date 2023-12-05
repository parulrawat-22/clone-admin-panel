import { useEffect, useState } from "react";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";

const Helpline = ({ helplineNumber, onSubmit }) => {
  const [mobileNumber, setMobileNumber] = useState(helplineNumber);
  const [id, setId] = useState("");

  useEffect(() => {
    console.log("cfgfjyul", helplineNumber);
    setMobileNumber(helplineNumber);
  }, [helplineNumber]);

  const handleHelpline = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.ADDHELPLINE, "POST", {
      mobileNumber: mobileNumber,
    })
      .then((res) => {
        console.log(res);
        onSubmit();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreateHelpline = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.UPDATEHELPLINE + `/${id}`,
      "PUT",
      {
        mobileNumber: mobileNumber,
      }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
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
