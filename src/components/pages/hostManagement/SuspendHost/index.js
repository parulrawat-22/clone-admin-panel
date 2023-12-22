import { useState } from "react";
import Button from "../../../library/Button";
import InputField from "../../../library/InputField";
import "./style.css";
import { fetchDataFromAPI } from "../../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../../network/NetworkConfiguration";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../../../base/Context/apiProvider";

const SuspendHost = () => {
  let navigate = useNavigate();
  const [endDate, setEndDate] = useState();
  // const [reason, setReason] = useState();
  const { id } = useParams();
  const apiProvider = useApi();

  const handleSuspendedHost = () => {
    console.log("jffjhjkknbj");
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.POSTSUSPENDEDHOST,
      "POST",
      {
        id: id,
        suspensionEndDate: endDate,
        // suspendedResion: reason,
      }
    )
      .then((res) => {
        navigate(`/suspendusers/?type=host&id=${id}`);
        console.log("122344", res);
      })
      .catch((err) => {
        console.log("098765", err);
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
        min={new Date().toISOString().split("T")[0]}
      />
      <br />
      <Button
        onClick={handleSuspendedHost}
        text="Submit"
        style={{ margin: "auto" }}
      />
    </div>
  );
};

export default SuspendHost;
