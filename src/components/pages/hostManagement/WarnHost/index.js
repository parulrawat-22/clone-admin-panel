import Button from "../../../library/Button";
import InputField from "../../../library/InputField";
import "./style.css";

const WarnedHost = () => {
  return (
    <div className="user__management__warn__user">
      <h3 className="warn__user__heading">Send warning</h3>
      <br />
      <InputField placeholder="Custom title" />
      <br />

      <InputField
        // onChange={handleDescription}
        placeholder="Description"
        className="warn__user__description"
      />
      <br />
      <Button
        // onClick={handleWarnedUsers}
        text="Submit"
        className="warn__user__button"
      />
    </div>
  );
};

export default WarnedHost;
