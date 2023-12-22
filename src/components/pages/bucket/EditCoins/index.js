import { useState } from "react";
import Button from "../../../library/Button";
import InputField from "../../../library/InputField";
import "./style.css";
import { fetchDataFromAPI } from "../../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../../network/NetworkConfiguration";
import Dropdown from "../../../library/Dropdown";
import { useApi } from "../../../../base/Context/apiProvider";

const EditCoins = ({ id, onSubmit }) => {
  const [reason, setReason] = useState("");
  const [deductCoins, setDeductCoins] = useState("");
  const [plusMinus, setPlusMinus] = useState("");
  const apiProvider = useApi();

  const fetchBucket = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.COINSDEDUCTION,
      "PUT",
      {
        id: id,
        reasonDeductionCoins: reason,
        deductionCoins: deductCoins,
        coinType: plusMinus,
      }
    )
      .then((res) => {
        console.log(res);
        onSubmit();
        setReason("");
        setDeductCoins("");
        // setPlusMinus("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDropdownChange = (e) => {
    setPlusMinus(e.target.value);
  };
  return (
    <div>
      <h3 className="edit__coins__heading">Edit Coins</h3>
      <br /> <br />
      <InputField
        value={reason}
        placeholder="Reason for coin deduction"
        onChange={(e) => setReason(e.target.value)}
      />
      <br />
      <Dropdown
        onChange={handleDropdownChange}
        options={[
          { name: "--Select--", value: "" },
          { name: "increment", value: "increment" },
          { name: "decrement", value: "decrement" },
        ]}
        style={{
          backgroundColor: "transparent",
        }}
      />
      <br />
      <InputField
        value={deductCoins}
        placeholder="Number of Coins"
        onChange={(e) => setDeductCoins(e.target.value)}
      />
      <br />
      <Button onClick={fetchBucket} className="edit__coin__btn" text="Submit" />
    </div>
  );
};

export default EditCoins;
