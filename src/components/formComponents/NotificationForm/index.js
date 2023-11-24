import Button from "../../library/Button";
import Dropdown from "../../library/Dropdown";
import InputField from "../../library/InputField";
import "./style.css";

const NotificationForm = () => {
  return (
    <div>
      <Dropdown />
      <br />
      <InputField placeholder="User ID" />
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
