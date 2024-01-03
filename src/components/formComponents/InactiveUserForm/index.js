import { useState } from "react";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";
import Dropdown from "../../library/Dropdown";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import { useApi } from "../../../base/Context/apiProvider";
import { NetworkConfiguration } from "../../../network/NetworkConfiguration";

const InactiveUserForm = ({ data }) => {
  console.log("data", data);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [image, setImage] = useState("");
  const [error, setError] = useState({
    titleError: "",
    bodyError: "",
    imageError: "",
  });

  const apiProvider = useApi();

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

  const handleInactiveUser = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.INACTIVEHOST,
      "POST",
      {
        title,
        body,
        imageUrl: image,
      }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   const validate = () => {
  //     let result = true;
  //     if (!title) {
  //       setError({ ...error, titleError: "Enter valid title" });
  //       result = false;
  //     } else if (!body) {
  //       setError({ ...error, bodyError: "Enter valid body" });
  //       result = false;
  //     } else if (!image) {
  //       setError({ ...error, imageError: "Enter invalid image" });
  //       result = false;
  //     }
  //     return result;
  //   };
  return (
    <div style={{ padding: "2px 0" }}>
      <h2 className="create__wallet__header">Send Notification</h2>

      <div style={{ padding: "1rem 2rem" }}>
        <Dropdown options={DropdownOptions} />
        <br />
        <InputField
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          error={error.titleError}
          value={title}
        />
        <br />
        <InputField
          type="text"
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter body"
          error={error.bodyError}
          value={body}
        />
        <br />

        <InputField
          type="file"
          onChange={(e) => {
            console.log("image :");
            setImage(e.target.files[0]);
          }}
          // value={image}
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
