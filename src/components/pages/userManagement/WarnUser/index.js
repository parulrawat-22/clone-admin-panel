import { useState } from "react";
import Button from "../../../library/Button";
import Dropdown from "../../../library/Dropdown";
import InputField from "../../../library/InputField";
import "./style.css";

const WarnUser = () => {
  const [selectReason, setSelectReason] = useState("");
  const [selectTitle, setSelectTitle] = useState("");
  const [selectDescription, setSelectDescription] = useState("");
  const [error, setError] = useState({});

  const validate = () => {
    let result = true;
    if (selectReason === "") {
      setError({ ...error, selectReason: "Please select a reason" });
      result = false;
    } else if (selectTitle === "") {
      setError({ ...error, selectTitle: "Title is required" });
      result = false;
    } else if (selectDescription === "") {
      setError({ ...error, selectDescription: "Description is required" });
      result = false;
    }
    return result;
  };
  return (
    <div className="user__management__warn__user">
      <h3 className="warn__user__heading">Send warning</h3>
      <br />
      <Dropdown option="option 1" value="option 1" />
      <br />
      <InputField placeholder="Custom title" />
      <br />

      <InputField
        placeholder="Description"
        className="warn__user__description"
      />
      <br />
      <Button text="Submit" className="warn__user__button" />
    </div>
  );
};

export default WarnUser;
