import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Button from "../../components/library/Button";
import InputField from "../../components/library/InputField";
import "./style.css";
import { useEffect, useState } from "react";
import { requestForToken } from "../../firebase";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";
import { useApi } from "../../base/Context/apiProvider";
import { errorToast, successToast } from "../../utils/toast";

const Login = () => {
  let navigate = useNavigate();
  const apiProvider = useApi();

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

  const handleOnSubmit = async () => {
    if (validateLoginData()) {
      let deviceToken = await requestForToken().then((res) => {
        return res;
      });
      fetchDataFromAPI(
        apiProvider?.apiUrl + NetworkConfiguration.ADMINLOGIN,
        "POST",
        {
          email: email,
          password: password,
          deviceToken,
        }
      )
        .then((res) => {
          console.log("Login successful");
          successToast("Login successful");
          localStorage.setItem("token", res.token);
          navigate("/dashboard");
        })
        .catch((err) => {
          console.log("Login Error", err);
          err.message
            ? errorToast(err?.message)
            : errorToast(err?.responseMessage);
        });
    }
  };

  const validateLoginData = () => {
    let validate = true;
    if (!email.match(/^[a-zA-Z0-9_\-.]{3,}@[A-Za-z0-9]{2,}.[a-zA-Z]{2,5}$/)) {
      setError({ ...error, email: "Please enter a valid email " });
      validate = false;
    } else if (password === "") {
      setError({ ...error, password: "Password is required" });
      console.log("Password is required");
      validate = false;
    }
    return validate;
  };

  // useEffect(() => {
  //   // adminLogin();
  // }, []);

  useEffect(() => {
    let loginToken = localStorage.getItem("token");
    if (loginToken) {
      requestForToken().then((res) => {
        handleDeviceToken(res);
      });
    }
  }, []);

  const handleDeviceToken = (deviceToken) => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.DEVICETOKEN,
      "PUT",
      {
        deviceToken,
      }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
              icon={eyeIcon()}
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
    </div>
  );
};

export default Login;
