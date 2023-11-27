import { useState } from "react";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../../../network/NetworkConnection";
import Button from "../../../library/Button";
import InputField from "../../../library/InputField";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";

const WarnedHost = () => {
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { id } = useParams();

  const handleWarnedHost = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.WARNHOSTNOTIFICATION,
      "POST",
      {
        id: id,
        title: title,
        body: body,
      }
    )
      .then((res) => {
        console.log(res);
        navigate(`/warnedusers/?type=host&id=${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="user__management__warn__user">
      <h3 className="warn__user__heading">Send warning</h3>
      <br />
      <InputField
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        placeholder="Custom title"
      />
      <br />

      <InputField
        onChange={(e) => {
          setBody(e.target.value);
        }}
        placeholder="Description"
        className="warn__user__description"
      />
      <br />
      <Button
        onClick={handleWarnedHost}
        text="Submit"
        className="warn__user__button"
      />
    </div>
  );
};

export default WarnedHost;
