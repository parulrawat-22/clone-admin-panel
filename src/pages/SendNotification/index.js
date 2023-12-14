import { useState } from "react";
import Button from "../../components/library/Button";
import Dropdown from "../../components/library/Dropdown";
import InputField from "../../components/library/InputField";
import "./style.css";

const SendNotification = () => {
  const [selectWho, setSelectWho] = useState("");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [name, setName] = useState("");

  const dropdownOptions = [
    {
      name: "--Select--",
    },
    {
      name: "Users",
      value: "Users",
    },
    {
      name: "Hosts",
      value: "Hosts",
    },
    {
      name: "Both",
      value: "Both",
    },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div className="notification__form">
        <div className="notification__content">
          <h2 className="notification__header"> Notification To All</h2>
          <Dropdown
            value={selectWho}
            //   onChange={handleSelectChange}
            options={dropdownOptions}
          />
          <br />
          <InputField
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Enter Title"
          />
          <br />
          <InputField
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
            placeholder="Enter Message"
          />
          <br />
          <br />
          <Button
            //   onClick={handleSendNotification}
            className="custom__margin"
            text="Send"
            style={{ margin: "auto" }}
          />
        </div>
      </div>
      <div className="send__notification__form">
        <div className="notification__content">
          <h2 className="notification__header">
            {" "}
            Notification To Selected User/Host
          </h2>
          <Dropdown
            value={selectWho} //   onChange={handleSelectChange}
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
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Enter Title"
          />
          <br />
          <InputField
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
            placeholder="Enter Message"
          />
          <br />
          <Button
            //   onClick={handleSendNotification}
            //className="custom__margin"
            text="Send"
            style={{ margin: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SendNotification;
