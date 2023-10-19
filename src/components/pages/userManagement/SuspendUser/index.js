import Button from "../../../library/Button";
import InputField from "../../../library/InputField";
import "./style.css";

const SuspendUser = () => {
  return (
    <div className="user__management__suspend__user">
      <h3 className="suspend__user__heading">Suspend User Account</h3>
      <InputField type="date" />
      <br />
      <Button text="Submit" style={{ margin: "auto" }} />
    </div>
  );
};

export default SuspendUser;
