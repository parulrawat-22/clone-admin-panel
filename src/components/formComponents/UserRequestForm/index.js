import { useEffect, useState } from "react";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";
import TextArea from "../../library/TextArea";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import { NetworkConfiguration } from "../../../network/NetworkConfiguration";
import { useApi } from "../../../base/Context/apiProvider";

const UserRequestForm = ({ id, onSubmit }) => {
  const [data, setData] = useState();

  const [showReason, setShowReason] = useState(false);
  const apiProvider = useApi();

  useEffect(() => {
    fetchOneUser();
  }, [apiProvider?.apiUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const fetchOneUser = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.GETONEUSER + `/${id}`,
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

  const handleEditUserOpen = () => {
    setShowReason(true);
  };

  const handleEditUser = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.UPDATEUSER,
      "PUT",
      {
        id: id,
        ...data,
      }
    )
      .then((res) => {
        console.log(res);
        onSubmit();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="user__form__container">
      <h2 className="user__form__heading ">Edit User Details</h2>
      <div className="user__form__content">
        <InputField value={data?.name} onChange={handleChange} name="name" />
        <InputField
          onChange={handleChange}
          value={data?.gender}
          name="gender"
        />
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
        <TextArea
          placeholer="reason"
          value={data?.showReason}
          onChange={handleChange}
          name="showReason"
        />
        <div>
          <Button
            style={{ margin: "auto" }}
            onClick={handleEditUser}
            text="Update"
          />
        </div>
      </div>
      {/* <Form */}
    </div>
  );
};
export default UserRequestForm;
