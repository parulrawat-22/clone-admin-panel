import Button from "../../library/Button";
import Dropdown from "../../library/Dropdown";
import InputField from "../../library/InputField";
import "./style.css";

const NotificationForm = ({ dropdownOptions }) => {
  return (
    <div className="notification__form">
      <h2 className="notification__form__heading">Send Notification</h2>
      <Dropdown options={dropdownOptions} />
      <br />
      <Dropdown options={dropdownOptions} />
      <br />
      <InputField placeholder="Enter Title" />
      <br />
      <InputField placeholder="Enter Message" />
      <br />
      <Button text="Send" style={{ margin: "auto" }} />
    </div>
  );
};

export default NotificationForm;
