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
import { errorToast, successToast } from "../../../../utils/toast";

const EditCoins = ({ id, onSubmit }) => {
  const [reason, setReason] = useState("");
  const [deductCoins, setDeductCoins] = useState("");
  const [plusMinus, setPlusMinus] = useState("");
  const apiProvider = useApi();
  const [error, setError] = useState({
    reasonError: "",
    selectionError: "",
    numberOfCoinsError: "",
  });

  const fetchBucket = () => {
    if (validate()) {
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
          successToast(res?.message);
          // setPlusMinus("");
        })
        .catch((err) => {
          console.log(err);
          errorToast(err?.message);
        });
    }
  };

  const handleDropdownChange = (e) => {
    setPlusMinus(e.target.value);
  };

  const handleReason = (e) => {
    setError({ ...error, reasonError: "" });
    setReason(e.target.value);
  };

  const handleAmount = (e) => {
    setError({ ...error, amountError: "" });
    setPlusMinus(e.target.value);
  };

  const validate = () => {
    let result = true;
    if (!reason) {
      setError({ ...error, reasonError: "Please enter a reason" });
      result = false;
    } else if (!deductCoins) {
      setError({ ...error, reasonError: "Please select any value" });
      result = false;
    } else if (!plusMinus) {
      setError({ ...error, reasonError: "Please enter a value" });
      result = false;
    }
    return result;
  };
  return (
    <div>
      <h3 className="edit__coins__heading">Edit Coins</h3>
      <br /> <br />
      <InputField
        value={reason}
        placeholder="Reason for coin deduction"
        onChange={handleReason}
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
        type="number"
        placeholder="Number of Coins"
        onChange={handleAmount}
      />
      <br />
      <Button onClick={fetchBucket} className="edit__coin__btn" text="Submit" />
    </div>
  );
};

export default EditCoins;
