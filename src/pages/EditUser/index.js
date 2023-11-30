import { useEffect, useState } from "react";
import InputField from "../../components/library/InputField";
import TextArea from "../../components/library/TextArea";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import "./style.css";
import { useLocation } from "react-router-dom";
import Button from "../../components/library/Button";

const EditUser = ({ id }) => {
  const [data, setData] = useState();
  const { state } = useLocation();
  console.log("State", state);

  useEffect(() => {
    fetchOneUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const fetchOneUser = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.GETONEUSER + `/${state.id}`,
      "GET"
    )
      .then((res) => {
        console.log(res);
        setData(res.getOneUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditUser = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.UPDATEUSER, "PUT", {
      id: id,
      ...data, // Include the updated data in the request
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //console.log("1234567", data);
  return (
    <div className="edit__user__inputs">
      <InputField value={data?.name} onChange={handleChange} name="name" />
      <InputField onChange={handleChange} value={data?.gender} name="gender" />
      <InputField
        value={data?.dateOfBirth}
        onChange={handleChange}
        name="dateOfBirth"
      />
      <InputField
        value={data?.mobileNumber}
        onChange={handleChange}
        name="mobileNumber"
      />
      <InputField value={data?.email} onChange={handleChange} />
      {/* <InputField value={data.pin} ode" /> */}
      <InputField value={data?.country} onChange={handleChange} />
      <InputField value={data?.state} onChange={handleChange} />
      <InputField value={data?.city} onChange={handleChange} />
      <InputField value={data?.proffession} onChange={handleChange} />
      <TextArea value={data?.addBio} onChange={handleChange} />
      <div>
        <Button onClick={handleEditUser} text="Update" />
      </div>
    </div>
  );
};

export default EditUser;
