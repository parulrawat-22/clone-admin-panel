import { useNavigate } from "react-router-dom";
import InputField from "../../components/library/InputField";
import "./style.css";
import { useState } from "react";
import axios from "axios";
import baseUrl from "../../baseUrl";
import EnterOtp from "../EnterOtp";
import { successToast } from "../../helper/toast";

const ForgotPassword = () => {
  const [enterOTP, setEnterOTP] = useState(true);
  const [email, setEmail] = useState("");

  const handleSentOtp = () => {
    axios
      .put(
        baseUrl + "admin/adminForgetPassword",
        {
          email: email,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        successToast(res.message);
        console.log(res, "res======");
        setEnterOTP(false);
      })
      .catch((err) => {
        console.log(err, "error-------");
      });
  };

  let navigate = useNavigate();
  return (
    <div className="login__container">
      <div className="login__left_half">
        {enterOTP ? (
          <div className="login__content_container">
            <div>
              <h2 className="login__heading">Forgot Password</h2>
              <p>We'll sent you an OTP on this email</p>
            </div>
            <div className="otp__button">
              <InputField
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email id or Phone Number"
              />
              <span className="forgot__otp" onClick={handleSentOtp}>
                Get OTP
              </span>
            </div>
            <div>
              <p
                className="back__to__login"
                onClick={() => {
                  navigate("/");
                }}
              >
                Back To Login
              </p>
            </div>
          </div>
        ) : (
          <div>
            <EnterOtp email={email} />
          </div>
        )}
      </div>
      <div className="login__right_half"></div>
    </div>
  );
};

export default ForgotPassword;
