import { useState } from "react";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";

const LeaderEditForm = ({ getAllLeaders, id }) => {
  const [leaderData, setLeaderData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    groupName: "",
    country: "",
    state: "",
    city: "",
    pinCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaderData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditBtn = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.EDITLEADER, "PUT", {
      id: id,
      ...leaderData,
    })
      .then((res) => {
        getAllLeaders();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="leader__edit__container">
      <h2 className="leader__edit__header">Edit Leader</h2>
      <div className="leader__edit__content">
        <InputField
          value={leaderData?.name}
          onChange={handleChange}
          placeholder="Name"
          name="leaderName"
        />
        <InputField
          value={leaderData?.email}
          placeholder="Email"
          onChange={handleChange}
          name="email"
        />

        <InputField
          onChange={handleChange}
          placeholder="Mobile Number"
          name="mobileNumber"
        />
        <InputField
          onChange={handleChange}
          placeholder="Group Name"
          name="groupName"
        />
        <InputField
          onChange={handleChange}
          placeholder="Country"
          name="country"
        />
        <InputField onChange={handleChange} placeholder="State" name="state" />
        <InputField onChange={handleChange} placeholder="City" name="city" />
        <InputField
          onChange={handleChange}
          placeholder="PinCode"
          name="pinCode"
        />

        <br />
        <Button
          onClick={handleEditBtn}
          text="Submit"
          style={{ margin: "auto" }}
        />
      </div>
    </div>
  );
};

export default LeaderEditForm;
