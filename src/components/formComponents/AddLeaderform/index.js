import InputField from "../../library/InputField";
import "./style.css";
import Button from "../../library/Button";
import { useState } from "react";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useLoader } from "../../../base/Context/loaderProvider";
import { useApi } from "../../../base/Context/apiProvider";

const AddLeaderForm = ({ onSubmit, edit, data, setData, id }) => {
  console.log("data :", data);
  //const [a,b]=useState()
  const [leaderName, setLeaderName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [groupName, setGroupName] = useState("");
  const [pin, setPin] = useState("");
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

  const loader = useLoader();
  const apiProvider = useApi();

  const handleAddLeader = (apiProvider) => {
    if (validate()) {
      loader.showLoader(true);

      fetchDataFromAPI(
        apiProvider?.apiUrl + NetworkConfiguration.ADDLEADER,
        "POST",
        {
          leaderName: leaderName,
          mobileNumber: mobileNumber,
          email: email,
          groupName: groupName,
          pin: pin,
          country: country,
          state: state,
          gender: gender,
          city: city,
          idProof: idProof,
          password: password,
        }
      )
        .then((res) => {
          loader.showLoader(false);
          console.log(res);
          onSubmit();
        })
        .catch((err) => {
          loader.showLoader(false);

          console.log(err);
        });
    }
  };

  const handleEditValue = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
    setPin(e.target.value);
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

  const handleEditLeader = (apiProvider) => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.EDITLEADER,
      "PUT",
      {
        id,
        ...data,
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
    } else if (!pin) {
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
    <div style={{ padding: "5px 0" }}>
      <h2 className="add__leader__heading">Add Leader</h2>

      <div className="add__leader__form">
        <InputField
          onChange={edit ? handleEditValue : handleLeaderName}
          value={edit ? data.leaderName : leaderName}
          error={error.leaderNameError}
          placeholder="Leader Name"
          name="leaderName"
        />
        <InputField
          value={edit ? data.mobileNumber : mobileNumber}
          onChange={edit ? handleEditValue : handleMobileNumber}
          type="number"
          placeholder="Mobile Number"
          error={error.mobileNumberError}
          name="mobileNumber"
        />
        <InputField
          error={error.emailError}
          value={edit ? data.email : email}
          onChange={edit ? handleEditValue : handleEmail}
          placeholder="Email"
          type="email"
          name="email"
        />
        <InputField
          value={edit ? data.gender : gender}
          onChange={edit ? handleEditValue : handleGender}
          placeholder="Gender"
          error={error.genderError}
          name="gender"
        />
        <InputField
          value={edit ? data.groupName : groupName}
          onChange={edit ? handleEditValue : handleGroupName}
          placeholder="Group Name"
          error={error.groupNameError}
          name="groupName"
        />
        <InputField
          value={edit ? data.pin : pin}
          onChange={edit ? handleEditValue : handlePinCode}
          type="number"
          placeholder="Pin Code"
          error={error.pinCodeError}
          name="pin"
        />
        <InputField
          value={edit ? data.country : country}
          onChange={edit ? handleEditValue : handleCountry}
          placeholder="Country"
          error={error.countryError}
          name="country"
        />
        <InputField
          value={edit ? data.state : state}
          onChange={edit ? handleEditValue : handleState}
          placeholder="State"
          error={error.stateError}
          name="state"
        />
        <InputField
          value={edit ? data.city : city}
          onChange={edit ? handleEditValue : handleCity}
          placeholder="City"
          error={error.cityError}
          name="city"
        />
        <InputField
          value={edit ? data.idProof : idProof}
          onChange={edit ? handleEditValue : handleIdProof}
          type="number"
          placeholder="ID Proof (must be 16 digits)"
          error={error.idProofError}
          name="idProof"
        />

        <InputField
          value={edit ? data.password : password}
          onChange={edit ? handleEditValue : handlePassword}
          placeholder="Password"
          error={error.passwordError}
          name="password"
        />
      </div>
      <Button
        onClick={edit ? handleEditLeader : handleAddLeader}
        className="add__leader__button"
        text={edit ? "Update" : "Submit"}
      />
    </div>
  );
};

export default AddLeaderForm;
