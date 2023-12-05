import axios from "axios";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";
import baseUrl from "../../../baseUrl";
import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { errorToast, successToast } from "../../../utils/toast";

const BannerForm = ({ onSubmit, edit, id, onClickEdit, fetchBannerList }) => {
  const [bannerName, setBannerName] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  console.log("id", id);

  const [error, setError] = useState({
    name: "",
    imageUrl: "",
  });

  const handleSetBannerName = (e) => {
    setError({ ...error, name: "" });
    setBannerName(e.target.value);
  };

  const handleSetBannerImage = (e) => {
    setImage(e.target.files[0]);
    setError({ ...error, imageUrl: "" });
  };

  useEffect(() => {
    ///fetchBannerList();
    handleSingleFetch();
  }, []);

  const validate = () => {
    let result = true;
    if (bannerName === "") {
      setError({ ...error, name: "Enter a valid banner name" });
      result = false;
    } else if (image === "") {
      setError({ ...error, imageUrl: "Image is required" });
      result = false;
    }
    return result;
  };

  const handleEdit = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.UPDATEBANNERNAME + `/${id}`,
      "PUT",
      { name: bannerName }
    )
      .then((res) => {
        console.log(res);
        fetchBannerList();
        successToast("Banner updated successfully");
        onClickEdit();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSingleFetch = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.GETONEBANNER + `/${id}`,
      "GET"
    )
      .then((res) => {
        console.log(res);
        setBannerName(res.data.name);
        setPreview(res.data.imageUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    validate();
    let data = new FormData();
    data.append("name", bannerName);
    data.append("image", image);
    console.log(image);
    axios
      .post(baseUrl + "banner/addBannerPicture", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBannerName("");
        setImage(null);
        onSubmit();
        successToast("Banner added successfully");
      })
      .catch((err) => {
        console.log(err);
        errorToast("Image is mandatory");
      });
  };
  return (
    <div className="banner__container">
      {edit ? (
        <h2 className="banner__heading">Update Banner</h2>
      ) : (
        <h2 className="banner__heading">Add Banner</h2>
      )}
      <div className="banner__fields__gap">
        <InputField
          onChange={handleSetBannerName}
          value={bannerName}
          placeholder="Banner Name"
          error={error.name}
        />
        <br /> <br />
        <InputField
          onChange={(e) => handleSetBannerImage(e)}
          type="file"
          error={error.imageUrl}
        />
        <p>{preview ? preview : ""}</p>
        <br />
        <Button
          text={edit ? "Update" : "Submit"}
          onClick={edit ? handleEdit : handleOnSubmit}
          className="add__banner__button"
        />
      </div>
    </div>
  );
};

export default BannerForm;
