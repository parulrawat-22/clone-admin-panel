import InputField from "../../library/InputField";
import "./style.css";
import Button from "../../library/Button";
import { useEffect, useState } from "react";
import baseUrl from "../../../baseUrl";
import axios from "axios";

const AddLeaderForm = ({ onSubmit }) => {
  const [leaderName, setLeaderName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [groupName, setGroupName] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [idProof, setIdProof] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({
    leaderNameError: "",
    mobileNumberError: "",
    emailError: "",
    genderError: "",
    groupNameError: "",
    pinCodeError: "",
    countryError: "",
    stateError: "",
    cityError: "",
    idProofError: "",
    passwordError: "",
  });

  const handleAddLeader = () => {
    validate();
    let data = new FormData();
    data.append("name", leaderName);
    data.append("mobile number", mobileNumber);
    data.append("email", email);
    data.append("gender", gender);
    data.append("group name", groupName);
    data.append("pincode", pinCode);
    data.append("country", country);
    data.append("state", state);
    data.append("city", city);
    data.append("idProof", idProof);
    data.append("password", password);
    axios
      .post(
        baseUrl + "admin/adminAddleader",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        onSubmit();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {}, []);

  const handleLeaderName = (e) => {
    setError({ ...error, leaderNameError: "" });
    setLeaderName(e.target.value);
  };

  const handleMobileNumber = (e) => {
    setError({ ...error, mobileNumberError: "" });
    setMobileNumber(e.target.value);
  };

  const handleEmail = (e) => {
    setError({ ...error, emailError: "" });
    setEmail(e.target.value);
  };

  const handleGender = (e) => {
    setError({ ...error, genderError: "" });
    setGender(e.target.value);
  };

  const handleGroupName = (e) => {
    setError({ ...error, groupNameError: "" });
    setGroupName(e.target.value);
  };

  const handlePinCode = (e) => {
    setError({ ...error, pinCodeError: "" });
    setPinCode(e.target.value);
  };

  const handleCountry = (e) => {
    setError({ ...error, countryError: "" });
    setCountry(e.target.value);
  };

  const handleState = (e) => {
    setError({ ...error, stateError: "" });
    setState(e.target.value);
  };

  const handleCity = (e) => {
    setError({ ...error, cityError: "" });
    setCity(e.target.value);
  };

  const handleIdProof = (e) => {
    setError({ ...error, idProofError: "" });
    setIdProof(e.target.value);
  };

  const handlePassword = (e) => {
    setError({ ...error, passwordError: "" });
    setPassword(e.target.value);
  };

  const validate = () => {
    let result = true;
    if (leaderName === "") {
      setError({ ...error, setError: "Enter valid leader name" });
      result = false;
    } else if (mobileNumber === "") {
      setError({ ...error, setError: "Enter valid mobile number" });
      result = false;
    } else if (email === "") {
      setError({ ...error, setError: "Enter valid email address" });
      result = false;
    } else if (gender === "") {
      setError({ ...error, setError: "Enter valid gender" });
      result = false;
    } else if (groupName === "") {
      setError({ ...error, setError: "Enter valid group name" });
      result = false;
    } else if (pinCode === "") {
      setError({ ...error, setError: "Enter valid pin code" });
      result = false;
    } else if (country === "") {
      setError({ ...error, setError: "Enter valid country" });
      result = false;
    } else if (state === "") {
      setError({ ...error, setError: "Enter valid country" });
      result = false;
    } else if (city === "") {
      setError({ ...error, setError: "Enter valid state" });
      result = false;
    } else if (idProof === "") {
      setError({ ...error, setError: "Enter valid proof" });
      result = false;
    } else if (password === "") {
      setError({ ...error, setError: "Enter password" });
      result = false;
    }
    return result;
  };
  return (
    <div>
      <div className="add__leader__styling">
        <InputField
          onChange={handleLeaderName}
          value={leaderName}
          error={error.leaderNameError}
          placeholder="Leader Name"
        />
        <InputField
          value={mobileNumber}
          onChange={handleMobileNumber}
          placeholder="Mobile Number"
          error={error.mobileNumberError}
        />
      </div>
      <div className="add__leader__styling">
        <InputField
          error={error.emailError}
          value={email}
          onChange={handleEmail}
          placeholder="Email"
        />
        <InputField
          onChange={handleGender}
          placeholder="Gender"
          error={error.genderError}
        />
      </div>
      <div className="add__leader__styling">
        <InputField
          value={groupName}
          onChange={handleGroupName}
          placeholder="Group Name"
          error={error.groupNameError}
        />
        <InputField
          onChange={handlePinCode}
          placeholder="Pin Code"
          error={error.pinCodeError}
        />
      </div>
      <div className="add__leader__styling">
        <InputField
          value={handleCountry}
          onChange={handleCountry}
          placeholder="Country"
          error={error.countryError}
        />
        <InputField
          onChange={handleState}
          placeholder="State"
          error={error.stateError}
        />
      </div>
      <div className="add__leader__styling">
        <InputField
          value={handleCity}
          onChange={handleCity}
          placeholder="City"
          error={error.cityError}
        />
        <InputField
          value={handleIdProof}
          onChange={handleIdProof}
          placeholder="ID Proof"
          error={error.idProofError}
        />
      </div>
      <InputField
        value={handlePassword}
        onChange={handlePassword}
        placeholder="password"
        error={error.passwordError}
      />
      <Button
        onClick={handleAddLeader}
        className="add__leader__button"
        text="Submit"
      />
    </div>
  );
};

export default AddLeaderForm;
