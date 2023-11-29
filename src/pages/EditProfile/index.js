import { useState } from "react";
import Button from "../../components/library/Button";
import InputField from "../../components/library/InputField";
import "./style.css";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const EditProfile = () => {
  const [eye, setEye] = useState("");
  const [eye1, setEye1] = useState("");

  const eyeIcon = () => {
    return eye ? <BsFillEyeFill /> : <BsFillEyeSlashFill />;
  };

  const inputType = () => {
    return eye ? "text" : "password";
  };

  const toHideShowPassword = () => {
    setEye(!eye);
  };

  const eyeIcon1 = () => {
    return eye1 ? <BsFillEyeFill /> : <BsFillEyeSlashFill />;
  };

  const inputType1 = () => {
    return eye1 ? "text" : "password";
  };

  const toHideShowPassword1 = () => {
    setEye1(!eye1);
  };

  return (
    <div className="edit__profile__container">
      <div className="edit__profile__box">
        <InputField placeholder="Old Password" />
        <br />
        <div className="edit__profile__icon">
          <InputField
            type={inputType()}
            icon={eyeIcon()}
            onEyeClick={toHideShowPassword}
            placeholder="New Password"
          />
        </div>
        <br />
        <div className="edit__profile__icon">
          <InputField
            type={inputType1()}
            icon={eyeIcon1()}
            onEyeClick={toHideShowPassword1}
            placeholder="Confirm Password"
          />
        </div>
        <br />

        <Button text="Update" />
      </div>
    </div>
  );
};

export default EditProfile;
