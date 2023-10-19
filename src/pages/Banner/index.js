import Layout from "../../components/Layout";
import InputField from "../../components/library/InputField";
import Button from "../../components/library/Button";
import "./style.css";
import axios from "axios";
import baseUrl from "../../baseUrl";
import { useState } from "react";
import { toast } from "react-toastify";

const Banner = () => {
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

  const validate = () => {
    let result = true;
    // if (!bannerName.match(/^[a-zA-Z]{3,}$ /)) {
    if (bannerName === "") {
      setError({ ...error, name: "Enter a valid banner name" });
      result = false;
    } else if (image === "") {
      setError({ ...error, imageUrl: "Image is required" });
      result = false;
    }
    return result;
  };

  const handleOnSubmit = () => {
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
        toast.success(res.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Layout>
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
          <Button text="Submit" onClick={handleOnSubmit} />
        </div>
      </div>
    </Layout>
  );
};

export default Banner;
