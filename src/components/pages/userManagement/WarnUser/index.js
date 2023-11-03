import { useEffect, useState } from "react";
import Button from "../../../library/Button";
import Dropdown from "../../../library/Dropdown";
import InputField from "../../../library/InputField";
import "./style.css";
import axios from "axios";
import baseUrl from "../../../../baseUrl";
import { useNavigate, useParams } from "react-router-dom";

const WarnUser = () => {
  let navigate = useNavigate();
  const [selectTitle, setSelectTitle] = useState("");
  const [selectDescription, setSelectDescription] = useState("");
  const [error, setError] = useState({});

  const { id } = useParams();

  const handleWarnedUsers = () => {
    validate();
    axios
      .post(
        baseUrl + "admin/sendWorningNotification",
        {
          id: id,
          title: selectTitle,
          body: selectDescription,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        navigate("/warnedusers");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleTitle = (e) => {
    setError({ ...error, selectTitle: "" });
    setSelectTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setError({ ...error, selectDescription: "" });
    setSelectDescription(e.target.value);
  };

  const validate = () => {
    let result = true;
    if (selectTitle === "") {
      setError({ ...error, selectTitle: "Title is required" });
      result = false;
    } else if (selectDescription === "") {
      setError({ ...error, selectDescription: "Description is required" });
      result = false;
    }
    return result;
  };
  return (
    <div className="user__management__warn__user">
      <h3 className="warn__user__heading">Send warning</h3>
      <br />
      <InputField onChange={handleTitle} placeholder="Custom title" />
      <br />

      <InputField
        onChange={handleDescription}
        placeholder="Description"
        className="warn__user__description"
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
