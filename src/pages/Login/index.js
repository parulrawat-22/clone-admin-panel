import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Button from "../../components/library/Button";
import InputField from "../../components/library/InputField";
import "./style.css";
import { useState } from "react";
import axios from "axios";
import baseUrl from "../../baseUrl";
// import { errorToast, successToast } from "../../components/Toast";
// import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  let navigate = useNavigate();

  const [eye, setEye] = useState(false);

  const eyeIcon = () => {
    return eye ? <BsFillEyeFill /> : <BsFillEyeSlashFill />;
  };

  const inputType = () => {
    return eye ? "text" : "password";
  };

  const toHideShowPassword = () => {
    setEye(!eye);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: null,
    password: null,
  });

  const handleOnSubmit = () => {
    if (!email.match(/^[a-zA-Z0-9_\-.]{3,}@[A-Za-z0-9]{2,}.[a-zA-Z]{2,5}$/)) {
      setError({ ...error, email: "Please enter a valid email " });
      return;
    } else if (password === "") {
      setError({ ...error, password: "Password is required" });
      console.log("Password is required");
      return;
    }

    axios
      .post(
        baseUrl + "admin/adminlogin",
        {
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log("Login successful");
        // successToast(res.message);
        // toast.success("yeahhhhh");
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log("Error: " + err);
        // toast.error("yeahhhhh");
      });
  };

  return (
    <div className="login__container">
      <div className="login__left_half">
        <div className="login__content_container">
          <h2 className="login__heading">Log In</h2>
          <InputField
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError({ ...error, email: null });
            }}
            placeholder="Email Id"
            error={error.email}
          />

          <div>
            <InputField
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError({ ...error, password: null });
              }}
              placeholder="Password"
              type={inputType()}
              error={error.password}
              icon={eyeIcon()} // Pass the result of the eyeIcon function as the icon prop
              onEyeClick={toHideShowPassword}
            />

            <p
              className="login__forgot_password"
              onClick={() => {
                navigate("/forgotpassword");
              }}
            >
              Forgot Password?
            </p>
          </div>
          <Button onClick={handleOnSubmit} text="LOG IN" />
        </div>
      </div>
      <div className="login__right_half"></div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Login;
