import { useEffect, useState } from "react";
import Button from "../../components/library/Button";
import Dropdown from "../../components/library/Dropdown";
import InputField from "../../components/library/InputField";
import "./style.css";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../base/Context/apiProvider";

const SendNotification = () => {
  let navigate = useNavigate();
  const [selectWho, setSelectWho] = useState("");
  const [selectParticularPerson, setSelectParticularPerson] = useState("");
  const [title, setTitle] = useState("");
  const [title1, setTitle1] = useState("");
  const [body1, setBody1] = useState("");
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [userData, setUserData] = useState([
    {
      name: "",
      value: "",
    },
  ]);
  // const [users, setUsers] = useState("");
  // const [hosts, setHosts] = useState("");
  const apiProvider = useApi();
  const handleSelectChange = (e) => {
    setSelectWho(e.target.value);
  };

  useEffect(() => {
    if (selectParticularPerson === "users") {
      getUserRequest();
      console.log("user", selectParticularPerson);
    }
    if (selectParticularPerson === "hosts") {
      getAcceptedHost();
      console.log("hosts", selectParticularPerson);
    }
    if (selectParticularPerson === "Both") {
      getAcceptedHost();
      getUserRequest();
    }
  }, [selectParticularPerson]);

  const getUserRequest = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.GETUSERS,
      "POST",
      {}
    )
      .then((res) => {
        console.log("12345678o", res);
        let mapped = res.result.map((result) => {
          return { name: result.name, value: result._id };
        });
        console.log(mapped);
        setUserData(mapped);
      })
      .catch((err) => {
        console.log(err, "err==========");
      });
  };

  const getAcceptedHost = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.ACCEPTEDHOST,
      "POST",
      {}
    )
      .then((res) => {
        let mappedData = res.result.map((result) => {
          return { name: result.name, value: result._id };
        });
        console.log(mappedData);
        setUserData(mappedData);
        console.log(res);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  const dropdownOptions = [
    {
      name: "--Select--",
    },
    {
      name: "Users",
      value: "users",
    },
    {
      name: "Hosts",
      value: "hosts",
    },
    {
      name: "Both",
      value: "Both",
    },
  ];

  const dropdownMultipleOptions = [
    {
      name: "--Select--",
    },
    {
      name: "Users",
      value: "users",
    },
    {
      name: "Hosts",
      value: "hosts",
    },
    {
      name: "Both",
      value: "Both",
    },
  ];

  const handleSendNotification = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.SENDTOALL,
      "POST",
      {
        title,
        body,
        to: selectWho,
      }
    )
      .then((res) => {
        navigate("/notification");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMultiSelectChange = (e) => {
    console.log("e", e);
    setSelectParticularPerson(e.target.value);
  };

  const handleMultiChange = (e) => {
    setName(e.target.value);
  };

  const handleMultipleNotification = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.SENDTOFEW,
      "POST",
      {
        title1,
        body1,
        users: selectParticularPerson,
        hosts: selectParticularPerson,
        Both: selectParticularPerson,
      }
    )
      .then((res) => {
        navigate("/notification");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("HHHHHHHHHH", selectParticularPerson);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div className="notification__form">
        <div className="notification__content">
          <h2 className="notification__header"> Notification To All</h2>
          <Dropdown
            value={selectWho}
            onChange={handleSelectChange}
            options={dropdownOptions}
          />
          <br />
          <InputField
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Enter Title"
          />
          <br />
          <InputField
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
            placeholder="Enter Message"
          />
          <br />
          <br />
          <Button
            onClick={handleSendNotification}
            className="custom__margin"
            text="Send"
            style={{ margin: "auto" }}
          />
        </div>
      </div>
      <div className="send__notification__form">
        <div className="notification__content">
          <h2 className="notification__header">
            {" "}
            Notification To Selected User/Host
          </h2>
          <Dropdown
            value={selectParticularPerson}
            onChange={handleMultiSelectChange}
            options={dropdownMultipleOptions}
          />
          <br />
          <Dropdown
            value={name}
            options={userData}
            onChange={handleMultiChange}
          />
          <br />
          <InputField
            value={title1}
            onChange={(e) => {
              setTitle1(e.target.value);
            }}
            placeholder="Enter Title"
          />
          <br />
          <InputField
            value={body1}
            onChange={(e) => {
              setBody1(e.target.value);
            }}
            placeholder="Enter Message"
          />
          <br />
          <Button
            onClick={handleMultipleNotification}
            text="Send"
            style={{ margin: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SendNotification;
