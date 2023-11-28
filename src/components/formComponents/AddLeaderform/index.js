import InputField from "../../library/InputField";
import "./style.css";
import Button from "../../library/Button";
import { useState } from "react";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";

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
    if (validate()) {
      fetchDataFromAPI(API_URL + NetworkConfiguration.ADDLEADER, "POST", {
        name: leaderName,
        mobileNumber: mobileNumber,
        email: email,
        groupName: groupName,
        pinCode: pinCode,
        country: country,
        state: state,
        city: city,
        idProof: idProof,
        password: password,
      })
        .then((res) => {
          console.log(res);
          onSubmit();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
    console.log("handleCountry", e.target.value);
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
    if (!leaderName) {
      setError({ ...error, leaderNameError: "Enter valid leader name" });
      result = false;
    } else if (!mobileNumber) {
      setError({ ...error, mobileNumberError: "Enter valid mobile number" });
      result = false;
    } else if (!email) {
      setError({ ...error, emailError: "Enter valid email address" });
      result = false;
    } else if (!gender) {
      setError({ ...error, genderError: "Enter valid gender" });
      result = false;
    } else if (!groupName) {
      setError({ ...error, groupNameError: "Enter valid group name" });
      result = false;
    } else if (!pinCode) {
      setError({ ...error, pinCodeError: "Enter valid pin Code" });
      result = false;
    } else if (!country) {
      setError({ ...error, countryError: "Enter valid Country" });
      result = false;
    } else if (!state) {
      setError({ ...error, stateError: "Enter valid State" });
      result = false;
    } else if (!city) {
      setError({ ...error, cityError: "Enter valid City" });
      result = false;
    } else if (!idProof) {
      setError({ ...error, idProofError: "Enter valid Id Proof" });
      result = false;
    } else if (!password) {
      setError({ ...error, passwordError: "Enter Password" });
      result = false;
    }
    return result;
  };
  return (
    <div>
      <h2 className="add__leader__heading">Add Leader</h2>

      <div className="add__leader__form">
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

        <InputField
          error={error.emailError}
          value={email}
          onChange={handleEmail}
          placeholder="Email"
        />
        <InputField
          value={gender}
          onChange={handleGender}
          placeholder="Gender"
          error={error.genderError}
        />

        <InputField
          value={groupName}
          onChange={handleGroupName}
          placeholder="Group Name"
          error={error.groupNameError}
        />
        <InputField
          value={pinCode}
          onChange={handlePinCode}
          type="number"
          placeholder="Pin Code"
          error={error.pinCodeError}
        />

        <InputField
          value={country}
          onChange={handleCountry}
          placeholder="Country"
          error={error.countryError}
        />
        <InputField
          value={state}
          onChange={handleState}
          placeholder="State"
          error={error.stateError}
        />

        <InputField
          value={city}
          onChange={handleCity}
          placeholder="City"
          error={error.cityError}
        />
        <InputField
          value={idProof}
          onChange={handleIdProof}
          type="number"
          placeholder="ID Proof"
          error={error.idProofError}
        />

        <InputField
          value={password}
          onChange={handlePassword}
          placeholder="Password"
          error={error.passwordError}
        />
      </div>
      <br />
      <Button
        onClick={handleAddLeader}
        className="add__leader__button"
        text="Submit"
      />
    </div>
  );
};

export default AddLeaderForm;
