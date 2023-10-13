import { useNavigate } from "react-router-dom";
import Button from "../../components/library/Button";
import OtpField from "./OtpField/otpfield";
import "./style.css";

const EnterOtp = ({ email }) => {
  let navigate = useNavigate();

  const handleOTPVerify = () => {
    navigate(`/newpassword/${email}`);
  };

  return (
    <div className="login__content_container">
      <div>
        <h2 className="login__heading">Enter OTP</h2>
        <p>We've sent an OTP on abcd@gmail.com</p>
      </div>
      <div className="login__otp_field">
        <OtpField />
        <OtpField />
        <OtpField />
        <OtpField />
        <OtpField />
        <OtpField />
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
