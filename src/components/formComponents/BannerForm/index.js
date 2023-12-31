import axios from "axios";
import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";
import baseUrl from "../../../baseUrl";
import { useEffect, useState } from "react";

const BannerForm = ({ handleClose }) => {
  const [bannerName, setBannerName] = useState("");
  const [image, setImage] = useState("");

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
    fetchBannerList();
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

  const fetchBannerList = () => {
    axios
      .get(baseUrl + "banner/getAllBanner", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("Banner List", res.data.result);
      })
      .catch((err) => {
        console.log("err", err);
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
        handleClose();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="banner__container">
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
        <br /> <br />
        <Button
          text="Submit"
          onClick={handleOnSubmit}
          className="add__banner__button"
        />
      </div>
    </div>
  );
};

export default BannerForm;
