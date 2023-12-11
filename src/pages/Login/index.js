import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Button from "../../components/library/Button";
import InputField from "../../components/library/InputField";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../baseUrl";
import { errorToast, successToast } from "../../utils/toast";
import { requestForToken } from "../../firebase";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";

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
  const [deviceToken, setDeviceToken] = useState("");

  const handleOnSubmit = () => {
    if (!email.match(/^[a-zA-Z0-9_\-.]{3,}@[A-Za-z0-9]{2,}.[a-zA-Z]{2,5}$/)) {
      setError({ ...error, email: "Please enter a valid email " });
      return;
    } else if (password === "") {
      setError({ ...error, password: "Password is required" });
      console.log("Password is required");
      return;
    }

    // useEffect(()=>{
    //   adminLogin();
    // }, []);

    const adminLogin = () => {
      fetchDataFromAPI(API_URL + NetworkConfiguration.ADMINLOGIN, "POST", {
        email: email,
        password: password,
        deviceToken,
      })
        .then((res) => {
          console.log("Login successful");
          successToast(res.message);
          localStorage.setItem("token", res.data.token);
          navigate("/dashboard");
        })
        .catch((err) => {
          console.log("Error", err);
          errorToast(err.response.data.message);
          errorToast(err.response.data.responseMessage);
        });
    };
    // axios
    //   .post(
    //     baseUrl + "admin/adminlogin",
    //     {
    //       email: email,
    //       password: password,
    //       deviceToken,
    //     },
    //     {
    //       headers: { "Content-Type": "application/json" },
    //     }
    //   )
    //   .then((res) => {
    //     console.log("Login successful");
    //     successToast(res.message);
    //     localStorage.setItem("token", res.data.token);
    //     navigate("/dashboard");
    //   })
    //   .catch((err) => {
    //     console.log("Error", err);
    //     errorToast(err.response.data.message);
    //     errorToast(err.response.data.responseMessage);
    //   });
  // };

  useEffect(() => {
    requestForToken().then((res) => {
      setDeviceToken(res);
    });
  }, []);

  const handleDeviceToken = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.DEVICETOKEN, "PUT", {
      deviceToken,
    })
      .then((res) => {
        console.log(res);
        setDeviceToken(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (deviceToken) {
      handleDeviceToken();
    }
  }, [deviceToken]);

  console.log("deviceToken", deviceToken);

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
