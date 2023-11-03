import axios from "axios";
import baseUrl from "../../../../baseUrl";
import Button from "../../../library/Button";
import InputField from "../../../library/InputField";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const SuspendUser = () => {
  let navigate = useNavigate();
  const [endDate, setEndDate] = useState();
  const { id } = useParams();

  const handleSuspendAccount = () => {
    axios
      .post(
        baseUrl + "admin/adminSuspendUser",
        {
          id: id,
          suspensionEndDate: endDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/suspendusers");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="user__management__suspend__user">
      <h3 className="suspend__user__heading">Suspend Account</h3>
      <InputField
        onChange={(e) => {
          setEndDate(e.target.value);
        }}
        type="date"
      />
      <br />
      <Button
        onClick={handleSuspendAccount}
        text="Submit"
        style={{ margin: "auto" }}
      />
    </div>
  );
};

export default SuspendUser;
