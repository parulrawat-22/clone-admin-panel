import Button from "../../library/Button";
import InputField from "../../library/InputField";
import "./style.css";
import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import { NetworkConfiguration } from "../../../network/NetworkConfiguration";
import { errorToast, successToast } from "../../../utils/toast";
import { useLoader } from "../../../base/Context/loaderProvider";
import { useApi } from "../../../base/Context/apiProvider";

const BannerForm = ({
  onSubmit,
  edit,
  id,
  onClickEdit,
  fetchBannerList,
  data,
}) => {
  const [bannerName, setBannerName] = useState(data?.name);
  const [image, setImage] = useState(data?.imageUrl);
  const [preview, setPreview] = useState("");

  console.log(data, "showBannerData");

  const [error, setError] = useState({
    name: "",
    imageUrl: "",
  });

  const loader = useLoader();
  const apiProvider = useApi();

  const handleSetBannerName = (e) => {
    setError({ ...error, name: "" });
    setBannerName(e.target.value);
  };

  const handleSetBannerImage = (e) => {
    setImage(e.target.files[0]);
    setError({ ...error, imageUrl: "" });
  };

  // useEffect(() => {
  //   ///fetchBannerList();
  //   handleSingleFetch();
  // }, [apiProvider?.apiUrl]);

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
    loader.showLoader(true);
    let data = new FormData();
    data.append("name", bannerName);
    data.append("image", image);
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.UPDATEBANNERNAME + `/${id}`,
      "PUT",
      data,
      { "Content-Type": "multipart/form-data" }
    )
      .then((res) => {
        loader.showLoader(false);
        // setBannerName(res?.data.name);
        console.log(res);
        fetchBannerList();
        successToast("Banner updated successfully");
        onClickEdit();
      })
      .catch((err) => {
        loader.showLoader(false);
        // errorToast(err.message);
        console.log(err);
      });
  };

  const handleOnSubmit = (e) => {
    console.log("onSubmit banner");
    e.preventDefault();
    if (validate()) {
      loader.showLoader(true);
      let data = new FormData();
      data.append("name", bannerName);
      data.append("image", image);
      console.log(image);
      fetchDataFromAPI(
        apiProvider?.apiUrl + NetworkConfiguration.ADDBANNER,
        "POST",
        data,
        {
          "Content-Type": "multipart/form-data",
        }
      )
        .then((res) => {
          loader.showLoader(false);
          setBannerName("");
          setImage(null);
          onSubmit();
          successToast("Banner added successfully");
        })
        .catch((err) => {
          loader.showLoader(false);
          console.log(err);
          errorToast("Failed to upload banner");
        });
    }
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
