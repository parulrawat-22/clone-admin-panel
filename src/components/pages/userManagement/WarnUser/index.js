import { useState } from "react";
import Button from "../../../library/Button";
import InputField from "../../../library/InputField";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDataFromAPI } from "../../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../../network/NetworkConfiguration";
import { useApi } from "../../../../base/Context/apiProvider";

const WarnUser = () => {
  let navigate = useNavigate();
  const [selectTitle, setSelectTitle] = useState("");
  const [selectDescription, setSelectDescription] = useState("");
  const [error, setError] = useState({
    title: "",
    body: "",
  });
  const { id } = useParams();
  const apiProvider = useApi();

  const handleWarnedUsers = () => {
    if (validate()) {
      fetchDataFromAPI(
        apiProvider?.apiUrl + NetworkConfiguration.USERWARNINGNOTIFICATION,
        "POST",
        { id: id, title: selectTitle, body: selectDescription }
      )
        .then((res) => {
          navigate(`/warnedusers/?type=user&id=${id}`);
          console.log(res, "!23456789");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleTitle = (e) => {
    setError({ ...error, title: "" });
    setSelectTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setError({ ...error, body: "" });
    setSelectDescription(e.target.value);
  };

  const validate = () => {
    let result = true;
    if (!selectTitle) {
      setError({ ...error, title: "Title is required" });
      result = false;
    } else if (!selectDescription) {
      setError({ ...error, body: "Description is required" });
      result = false;
    }
    return result;
  };

  return (
    <div className="user__management__warn__user">
      <h3 className="warn__user__heading">Send warning</h3>
      <br />
      <InputField
        onChange={handleTitle}
        placeholder="Custom title"
        error={error.title}
      />
      <br />

      <InputField
        onChange={handleDescription}
        placeholder="Description"
        className="warn__user__description"
        error={error.body}
      />
      <br />
      <Button
        onClick={handleWarnedUsers}
        text="Submit"
        className="warn__user__button"
      />
    </div>
  );
};

export default WarnUser;
