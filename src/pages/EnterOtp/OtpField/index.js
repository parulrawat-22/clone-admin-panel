import InputField from "../../../components/library/InputField";
import "./style.css";

const OtpField = (props) => {
  return (
    <InputField className="otp__field" type="text" maxLength="1"></InputField>
  );
};

export default OtpField;
