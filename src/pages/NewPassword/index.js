import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/library/Button";
import InputField from "../../components/library/InputField";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import axios from "axios";
import baseUrl from "../../baseUrl";
import "./style.css";

const NewPassword = () => {
  const navigate = useNavigate();
  const [eye, setEye] = useState(false);
  const [eye2, setEye2] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    newPassword: newPassword,
    conformPassword: confirmPassword,
  });
  const { email } = useParams();

  const eyeIcon = () => {
    return eye ? <BsFillEyeFill /> : <BsFillEyeSlashFill />;
  };

  const inputType = () => {
    return eye ? "text" : "password";
  };

  const toHideShowPassword = () => {
    setEye(!eye);
  };

  const eyeIcon2 = () => {
    return eye2 ? <BsFillEyeFill /> : <BsFillEyeSlashFill />;
  };

  const inputType2 = () => {
    return eye2 ? "text" : "password";
  };

  const toHideShowPassword2 = () => {
    setEye2(!eye2);
  };

  const handleSetNewPassword = (e) => {
    setError({ ...error, newPassword: "" });
    setNewPassword(e.target.value);
  };

  const handleSetConfirmPassword = (e) => {
    setError({ ...error, conformPassword: "" });
    setConfirmPassword(e.target.value);
  };

  const validate = () => {
    let result = true;
    if (
      !newPassword.match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      )
    ) {
      setError({ ...error, newPassword: "Enter a valid password" });
      result = false;
    } else if (confirmPassword !== newPassword) {
      setError({ ...error, conformPassword: "Passwords do not match" });
      result = false;
    }
    return result;
  };

  const handleonSubmit = () => {
    const isValidated = validate();
    if (isValidated) {
      axios
        .put(
          baseUrl + "admin/adminResetPasword",
          {
            email: email,
            newPassword: newPassword,
            conformPassword: confirmPassword,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          navigate("/");
          console.log(res, "res------");
        })
        .catch((err) => {
          console.log(err, "err------");
        });
    }
  };

  return (
    <div className="login__container">
      <div className="login__left_half">
        <div className="login__content_container">
          <div>
            <h2 className="login__heading">Set New Password</h2>
            <p>Must be atleast 8 characters</p>
          </div>

          <InputField
            type={inputType()}
            onEyeClick={toHideShowPassword}
            icon={eyeIcon()}
            placeholder="Password"
            value={newPassword}
            onChange={handleSetNewPassword}
            error={error.newPassword}
          />

          <div>
            <InputField
              type={inputType2()}
              icon={eyeIcon2()}
              onEyeClick={toHideShowPassword2}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleSetConfirmPassword}
              error={error.conformPassword}
            />
          </div>
          <Button onClick={handleonSubmit} text="Reset Password" />
        </div>
      </div>
      <div className="login__right_half"></div>
    </div>
  );
};

export default NewPassword;
