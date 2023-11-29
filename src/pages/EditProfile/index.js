import { useState } from "react";
import Button from "../../components/library/Button";
import InputField from "../../components/library/InputField";
import "./style.css";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";

const EditProfile = () => {
  const [eye, setEye] = useState("");
  const [eye1, setEye1] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");

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

  const handleChangePassword = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.CHANGEPASSWORD, "PUT", {
      password,
      newPassword,
      conformPassword,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="edit__profile__container">
      <div className="edit__profile__box">
        <InputField
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Old Password"
        />
        <br />
        <div className="edit__profile__icon">
          <InputField
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            type={inputType()}
            icon={eyeIcon()}
            onEyeClick={toHideShowPassword}
            placeholder="New Password"
          />
        </div>
        <br />
        <div className="edit__profile__icon">
          <InputField
            onChange={(e) => {
              setConformPassword(e.target.value);
            }}
            type={inputType1()}
            icon={eyeIcon1()}
            onEyeClick={toHideShowPassword1}
            placeholder="Confirm Password"
          />
        </div>
        <br />

        <Button onClick={handleChangePassword} text="Update" />
      </div>
    </div>
  );
};

export default EditProfile;
