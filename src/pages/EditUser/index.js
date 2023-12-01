import { useEffect, useState } from "react";
import InputField from "../../components/library/InputField";
import TextArea from "../../components/library/TextArea";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import "./style.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/library/Button";

const EditUser = ({ id }) => {
  let navigate = useNavigate();
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
        delete res.getOneUser?._id;
        setData(res.getOneUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditUser = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.UPDATEUSER, "PUT", {
      id: state.id,
      ...data,
    })
      .then((res) => {
        console.log(res);
        navigate("/allusers");
      })
      .catch((err) => {
        console.log(err);
      });
  };
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

      <InputField value={data?.email} onChange={handleChange} name="email" />
      <InputField
        value={data?.country}
        onChange={handleChange}
        name="country"
      />
      <InputField value={data?.state} onChange={handleChange} name="state" />
      <InputField value={data?.city} onChange={handleChange} name="city" />
      <InputField
        value={data?.proffession}
        onChange={handleChange}
        name="proffession"
      />
      <TextArea value={data?.addBio} onChange={handleChange} name="addBio" />
      <div>
        <Button onClick={handleEditUser} text="Update" />
      </div>
    </div>
  );
};

export default EditUser;
