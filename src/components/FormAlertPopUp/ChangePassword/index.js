import "./style.css";
import InputField from "../../library/InputField";
import Button from "../../library/Button";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import { useState } from "react";
import { useLoader } from "../../../base/Context/loaderProvider";

const ChangePassword = ({ onSubmit }) => {
  const [eye, setEye] = useState("");
  const [eye1, setEye1] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");

  const loader = useLoader();

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
    loader.showLoader(true);
    fetchDataFromAPI(API_URL + NetworkConfiguration.CHANGEPASSWORD, "PUT", {
      password,
      newPassword,
      conformPassword,
    })
      .then((res) => {
        loader.showLoader(false);
        console.log(res);
        onSubmit();
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };
  return (
    // <div className="edit__profile__container">
    //   <h2>Change Password</h2>
    //   <div className="edit__profile__box">
    //     <InputField
    //       onChange={(e) => {
    //         setPassword(e.target.value);
    //       }}
    //       placeholder="Old Password"
    //     />
    //     <br />
    //     <InputField
    //       onChange={(e) => {
    //         setNewPassword(e.target.value);
    //       }}
    //       type={inputType()}
    //       icon={eyeIcon()}
    //       onEyeClick={toHideShowPassword}
    //       placeholder="New Password"
    //     />
    //     <br />
    //     <InputField
    //
    //     <br />

    //     <Button />
    //   </div>
    // </div>
    <div className="premium__coin__container">
      <h2 className="premium__coin__heading">Change Password</h2>
      <div className="premium__coin">
        <InputField
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Old Password"
        />

        <br />
        <InputField
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
          type={inputType()}
          icon={eyeIcon()}
          onEyeClick={toHideShowPassword}
          placeholder="New Password"
        />
        <br />

        <InputField
          onChange={(e) => {
            setConformPassword(e.target.value);
          }}
          type={inputType1()}
          icon={eyeIcon1()}
          onEyeClick={toHideShowPassword1}
          placeholder="Confirm Password"
        />
        <br />

        <Button
          style={{ margin: "auto" }}
          onClick={handleChangePassword}
          text="Update"
        />
      </div>
    </div>
  );
};

export default ChangePassword;
