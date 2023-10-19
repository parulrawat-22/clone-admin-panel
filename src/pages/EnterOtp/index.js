import { useNavigate } from "react-router-dom";
import Button from "../../components/library/Button";
import OtpField from "./OtpField/index";
import "./style.css";
import { useState } from "react";
import axios from "axios";
import baseUrl from "../../baseUrl";

const EnterOtp = ({ email }) => {
  let navigate = useNavigate();
  const inputs = [];
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (event, index) => {
    if (event.nativeEvent.key === "Backspace") {
      const value = "";
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index > 0) {
        inputs[index - 1].focus();
      }
      return;
    }
    if (event.nativeEvent.key.match(/[^0-9]/) || otp[otp.length - 1]) return;
    const value = event.nativeEvent.key;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < newOtp.length - 1) {
      inputs[index + 1].focus();
    }
  };

  const handleOTPVerify = () => {
    const newOTP = otp.join("");
    console.log(newOTP);
    axios
      .put(
        baseUrl + "admin/verifyOtp",
        {
          email: email,
          otp: newOTP,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        navigate(`/newpassword/${email}`);

        console.log(res);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  return (
    <div className="login__content_container">
      <div>
        <h2 className="login__heading">Enter OTP</h2>
        <p>We've sent an OTP on abcd@gmail.com</p>
      </div>
      <div className="login__otp_field">
        {otp &&
          otp.map((val, index) => (
            <input
              className="otp__field"
              key={index}
              maxLength={1}
              onKeyDown={(event) => handleOtpChange(event, index)}
              value={val}
              ref={(input) => {
                inputs[index] = input;
              }}
              autoFocus={!index ? true : false}
            />
          ))}
      </div>
      <Button onClick={handleOTPVerify} text="Submit" />
      <div>
        <p
          onClick={() => {
            navigate("/");
          }}
          className="back__to__login"
        >
          Back To Login
        </p>
      </div>
    </div>
  );
};

export default EnterOtp;
