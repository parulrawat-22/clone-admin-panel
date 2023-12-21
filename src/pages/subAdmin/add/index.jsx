import React, { useEffect, useState } from "react";

import { IoClose } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import "./style.css";
import { AllowedItem } from "../edit";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputField from "../../../components/library/InputField";
import Button from "../../../components/library/Button";
import sidebarData from "../../../Constant/DataComponent";
import ResponsibilitiesDropdown from "../../../components/library/ResponsibilitiesDropdown";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import { API_URL, NetworkConfiguration } from "../../../network/NetworkConfiguration";

export default function AddSubAdmin() {
  const navigate = useNavigate();

  const [options, setOptions] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);
  const [passInput, setPassInput] = useState(true);
  const [passInputTwo, setPassInputTwo] = useState(true);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    responsibilities: "",
  });

  const handleEye = () => {
    if (passInput) {
      return <FaEyeSlash />;
    } else {
      return <FaEye />;
    }
  };
  const handleType = () => {
    setPassInput(!passInput);
  };

  const handleEyeTwo = () => {
    if (passInputTwo) {
      return <FaEyeSlash />;
    } else {
      return <FaEye />;
    }
  };
  const handleTypeTwo = () => {
    setPassInputTwo(!passInputTwo);
  };

  const handleName = (e) => {
    setData({ ...data, name: e.target.value });
    setError({ ...error, name: "" });
  };
  const handleEmail = (e) => {
    setData({ ...data, email: e.target.value });
    setError({ ...error, email: "" });
  };
  const handlePassword = (e) => {
    setData({ ...data, password: e.target.value });
    setError({ ...error, password: "" });
  };
  const handleConfirmPassword = (e) => {
    setData({ ...data, confirmPassword: e.target.value });
    setError({ ...error, confirmPassword: "" });
  };

  //set side bar menu options for sub admin responsibilities
  useEffect(() => {
    setOptions(
      sidebarData.map((item) => ({ name: item.label, accessType: [] }))
    );
  }, [sidebarData]);



  const handleAccess = (name, accessType) => {
    let updatedData = [];
    updatedData = responsibilities?.map((item, index) => {
      if (item?.name === name) {
        return {
          name: item.name,
          accessType: item?.accessType
            ? item?.accessType.includes(accessType)
              ? item?.accessType.filter((accessVal) => accessVal !== accessType)
              : [...item?.accessType, accessType]
            : [accessType],
        };
      } else {
        return item;
      }
    });
    setResponsibilities(updatedData);
  };

  const handleRemove = (e) => {
    let newArray = responsibilities.filter((item) => {
      return item.name !== e.name;
    });
    setResponsibilities(newArray);
  };

  const validate = () => {
    let result = true;
    if (!data.name) {
      setError({ ...error, name: "Invalid Name" });
      result = false;
    } else if (!data.email ) {
      setError({ ...error, email: "Invalid Email" });
      result = false;
    } else if (!data.password) {
      setError({ ...error, password: "Invalid Password" });
      result = false;
    } else if (!data.confirmPassword) {
      setError({ ...error, confirmPassword: "Invalid Password" });
      result = false;
    } else if (!responsibilities.length) {
      setError({ ...error, responsibilities: "Invalid Responsibilities" });
      result = false;
    }

    return result;
  };

  const handleAddSubAdmin = () => {
    if (validate()) {

fetchDataFromAPI(API_URL + NetworkConfiguration.ADDSUBADMIN, "POST" , {
  name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      responsibility: responsibilities,



}).then((res) => {
  navigate("/subAdmin");
})
.catch((err) => {
 console.log('add subadmin',err)
})}}




  useEffect(() => {
    if (responsibilities.length) {
      setError({ ...error, responsibilities: "" });
    }
  }, [responsibilities]);

  return (
    <div className="add_subAdmin_row">
      <div className="add_subAdmin_column">
        

        <InputField  label="Name"
          placeholder=""
          type="text"
          onChange={handleName}
          error={error.name}
          value={data.name}/>


        <InputField
          label="Email"
          placeholder=""
          type="text"
          onChange={handleEmail}
          error={error.email}
          value={data.email}
        />
        <InputField
          label="Password"
          placeholder=""
          type={passInput ? "password" : "text"}
          onChange={handlePassword}
          error={error.password}
          value={data.password}
          eye={handleEye()}
          handleType={handleType}
        />
        <InputField
          label="Confirm Password"
          placeholder=""
          type={passInputTwo ? "password" : "text"}
          onChange={handleConfirmPassword}
          error={error.confirmPassword}
          value={data.confirmPassword}
          eye={handleEyeTwo()}
          handleType={handleTypeTwo}
        />

        <ResponsibilitiesDropdown
          options={options}
          responsibilities={responsibilities}
          setResponsibilities={setResponsibilities}
          error={error.responsibilities}
        />

        <Button
          onClick={handleAddSubAdmin}
          text="Add Sub Admin"
          style={{
            marginTop: "20px",
            // backgroundColor: AppColors.lightBlueColor,
            // color: AppColors.whiteColor,
            border: "none",
          }}
          className="web_button"
        />
      </div>
      <div className="add_subAdmin_column">
        {responsibilities.length ? (
          <>
            <label className="label_style" style={{ display: "block" }}>
              Allowance
            </label>
            <div className="assign_responsibilities_box">
              {responsibilities.map((item, index) => {
                return (
                  <AllowedItem
                    item={item}
                    key={index}
                    handleAccess={handleAccess}
                    handleRemove={handleRemove}
                  />
                );
              })}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
