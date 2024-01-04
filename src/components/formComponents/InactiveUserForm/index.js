import { useState } from "react";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";
import Dropdown from "../../library/Dropdown";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import { useApi } from "../../../base/Context/apiProvider";
import { NetworkConfiguration } from "../../../network/NetworkConfiguration";

const InactiveUserForm = ({
  data,
  setShowNotificationPopup,
  user,
  allData,
  checkHeaderClick,
  setData,
  setAllData,
}) => {
  console.log("data", data);
  console.log("alldata", allData);
  console.log("checkHeaderClick", checkHeaderClick);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState({
    titleError: "",
    bodyError: "",
    imageError: "",
  });

  const apiProvider = useApi();
  const url = user
    ? NetworkConfiguration.INACTIVEUSER
    : NetworkConfiguration.INACTIVEHOST;

  const DropdownOptions = [
    {
      name: "--Select --",
    },
    {
      name: "Low Balance",
      value: "Low Balance",
    },
    {
      name: "Marketing",
      value: "Marketing",
    },
  ];

  const handleTitle = (e) => {
    setError({ ...error, titleError: "" });
    setTitle(e.target.value);
  };

  const handleBody = (e) => {
    setError({ ...error, bodyError: "" });
    setBody(e.target.value);
  };

  const handleImage = (e) => {
    setError({ ...error, imageError: "" });
    setImage(e.target.files[0]);
  };

  const handleInactiveUser = () => {
    if (validate()) {
      let inactiveUser = {
        title,
        body,
        image,
      };
      if (user) {
        inactiveUser.users = checkHeaderClick ? allData : data;
      } else {
        inactiveUser.hosts = checkHeaderClick ? allData : data;
      }
      console.log("helllllllllllllllllll", url, "POST");
      fetchDataFromAPI(apiProvider?.apiUrl + url, "POST", inactiveUser, {
        "Content-Type": "multipart/form-data",
      })
        .then((res) => {
          console.log(res);
          setShowNotificationPopup(false);
          setAllData("");
          setData("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  console.log("image", image);

  const validate = () => {
    let result = true;
    if (!title) {
      setError({ ...error, titleError: "Enter valid title" });
      result = false;
    } else if (!body) {
      setError({ ...error, bodyError: "Enter valid body" });
      result = false;
    } else if (!image) {
      setError({ ...error, imageError: "Enter valid image" });
      result = false;
    }
    return result;
  };
  return (
    <div style={{ padding: "2px 0" }}>
      <h2 className="create__wallet__header">Send Notification</h2>

      <div style={{ padding: "1rem 2rem" }}>
        <Dropdown options={DropdownOptions} />
        <br />
        <InputField
          type="text"
          onChange={handleTitle}
          placeholder="Enter title"
          error={error.titleError}
          value={title}
        />
        <br />
        <InputField
          type="text"
          onChange={handleBody}
          placeholder="Enter body"
          error={error.bodyError}
          value={body}
        />
        <br />

        <InputField
          type="file"
          onChange={handleImage}
          error={error.imageError}
        />
        <br />
        <Button
          onClick={handleInactiveUser}
          style={{ margin: "auto" }}
          text="Submit"
        />
      </div>
    </div>
  );
};

export default InactiveUserForm;
