import axios from "axios";
import baseUrl from "../../../../baseUrl";
import Button from "../../../library/Button";
import InputField from "../../../library/InputField";
import "./style.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../../network/NetworkConfiguration";

const SuspendUser = () => {
  let navigate = useNavigate();
  const [endDate, setEndDate] = useState();
  const { id } = useParams();

  const handleSuspendAccount = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.POSTSUSPENDEDUSER, "POST", {
      id: id,
      suspensionEndDate: endDate,
    })
      .then((res) => {
        navigate(`/suspendusers/?type=user&id=${id}`);
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
