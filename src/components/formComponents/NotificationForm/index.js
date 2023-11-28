import { useState } from "react";
import Button from "../../library/Button";
import Dropdown from "../../library/Dropdown";
import InputField from "../../library/InputField";
import "./style.css";

const NotificationForm = ({ dropdownOptions }) => {
  const [selectWho, setSelectWho] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState({
    selection: "",
    titleError: "",
    bodyError: "",
  });

  const handleSelectChange = (e) => {
    setError({ ...error, selection: "" });
    setSelectWho(e.target.value);
  };

  const handleTitle = (e) => {
    setError({ ...error, titleError: "" });
    setTitle(e.target.value);
  };

  const handleBody = (e) => {
    setError({ ...error, bodyError: "" });
    setBody(e.target.value);
  };

  const handleSendNotification = () => {
    if (validate()) {
    }
  };

  const validate = () => {
    let result = true;
    if (!selectWho) {
      setError({ ...error, selection: "Select any option" });
      result = false;
    } else if (!title) {
      setError({ ...error, titleError: "Enter valid title" });
      result = false;
    } else if (!body) {
      setError({ ...error, bodyError: "Enter valid body" });
      result = false;
    }
    return result;
  };
  return (
    <div className="notification__form">
      <h2 className="notification__form__heading">Send Notification</h2>
      <Dropdown
        value={selectWho}
        onChange={handleSelectChange}
        options={dropdownOptions}
      />
      <br />
      <Dropdown
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        options={dropdownOptions}
      />
      <br />
      <InputField
        value={title}
        onChange={handleTitle}
        placeholder="Enter Title"
      />
      <br />
      <InputField
        value={body}
        onChange={handleBody}
        placeholder="Enter Message"
      />
      <br />
      <Button
        onClick={handleSendNotification}
        text="Send"
        style={{ margin: "auto" }}
      />
    </div>
  );
};

export default NotificationForm;
