import { useNavigate } from "react-router-dom";
import InputField from "../../components/library/InputField";
import "./style.css";
import { useState } from "react";

import EnterOtp from "../EnterOtp";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import { useApi } from "../../base/Context/apiProvider";
import { NetworkConfiguration } from "../../network/NetworkConfiguration";
import { errorToast, successToast } from "../../utils/toast";
// import { successToast } from "../../components/Toast";

const ForgotPassword = () => {
  const [enterOTP, setEnterOTP] = useState(true);
  const [email, setEmail] = useState("");

  const apiProvider = useApi();

  const handleSentOtp = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.FORGOTPASSWORD,
      "PUT",
      {
        email: email,
      }
    )
      .then((res) => {
        console.log(res, "res======");
        setEnterOTP(false);
        successToast(res?.message);
      })
      .catch((err) => {
        errorToast(err.message);
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
                placeholder="Email Id"
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
