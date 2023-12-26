import { useState } from "react";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import { NetworkConfiguration } from "../../../network/NetworkConfiguration";
import { errorToast, successToast } from "../../../utils/toast";
import { useApi } from "../../../base/Context/apiProvider";

const InterestForm = ({
  onSubmit,
  id,
  fetchInterestData,
  name,
  setName,
  edit,
  onEdit,
}) => {
  //const [edit, setEdit] = useState("");
  const [interestName, setInterestName] = useState("");
  const [error, setError] = useState({
    name: "",
  });
  const apiProvider = useApi();

  const handleSetBannerName = (e) => {
    setName(e.target.value);
  };

  const handleOnEdit = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.UPDATEINTEREST + `/${id}`,
      "PUT",
      {
        name: name,
      }
    )
      .then((res) => {
        successToast(res?.message);
        onEdit();
        console.log(res);
      })

      .catch((err) => {
        errorToast(err?.message);

        console.log(err);
      });
  };

  const handleOnSubmit = () => {
    if (validate()) {
      fetchDataFromAPI(
        apiProvider?.apiUrl + NetworkConfiguration.ADDINTEREST,
        "POST",
        {
          name: interestName,
        }
      )
        .then((res) => {
          successToast(res?.message);
          console.log(res);
          onSubmit();
        })
        .catch((err) => {
          errorToast(err?.message);

          console.log(err);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (interestName === "") {
      setError({ ...error, name: "Enter valid Interest Name" });
      result = false;
    }
    return result;
  };

  const handleOnChange = (e) => {
    setError({ ...error, name: "" });
    setInterestName(e.target.value);
  };
  return (
    <div className="banner__container">
      {edit ? (
        <h2 className="banner__heading">Update Banner</h2>
      ) : (
        <h2 className="banner__heading">Add Interest</h2>
      )}
      <div className="banner__fields__gap">
        <InputField
          onChange={edit ? handleSetBannerName : handleOnChange}
          value={edit ? name : interestName}
          placeholder="Interest Name"
          error={error.name}
        />
        <br /> <br />
        <Button
          style={{ cursor: "pointer" }}
          text={edit ? "Update" : "Submit"}
          onClick={edit ? handleOnEdit : handleOnSubmit}
          className="add__banner__button"
        />
      </div>
    </div>
  );
};

export default InterestForm;
