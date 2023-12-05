import { useState } from "react";
import Button from "../../../library/Button";
import InputField from "../../../library/InputField";
import "./style.css";

const HostForm = () => {
  const [isEdited, setIsEdited] = useState({
    name: "",
    dateOfBirth: "",
    email: "",
  });
  return (
    <div>
      <h2 className="host__form__heading">Edit Host Details</h2>
      <div className="host__form__content">
        <InputField placeholder="Name" />
        <br />
        <InputField placeholder="Date Of Birth" />

        <Button style={{ margin: "auto" }} text="Update" />
      </div>
    </div>
  );
};

export default HostForm;
