import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Button from "../../components/library/Button";
import BannerTable from "../../Constant/BannerTable";
import FormAlertPopUp from "../../components/FormAlertPopUp";
import "./style.css";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";
import BannerForm from "../../components/formComponents/BannerForm";
import AlertPopUp from "../../components/AlertPopUp";

const Banner = () => {
  const [showBannerForm, setShowBannerForm] = useState(false);
  const [showBannerData, setShowBannerData] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState();
  const [bannerId, setBannerId] = useState("");

  const handleShowDeleteAlert = () => {
    setShowDeleteAlert(true);
  };

  const handleShowDeleteAlerClose = () => {
    setShowDeleteAlert(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteAlert(false);
    // navigate("/banner");
  };

  useEffect(() => {
    fetchBannerList();
  }, []);

  const fetchBannerList = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETBANNER, "GET")
      .then((res) => {
        setShowBannerData(res.result);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const handleAddBanner = () => {
    setShowBannerForm(true);
  };

  const handleAddBannerClose = () => {
    setShowBannerForm(false);
  };

  const onSubmit = () => {
    setShowBannerForm(false);
    fetchBannerList();
  };

  const handleDelete = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.DELETEBANNER + `/${bannerId}`,
      "DELETE"
    )
      .then((res) => {
        console.log(res);
        setShowDeleteAlert(false);
        fetchBannerList();
      })
      .catch((err) => {
        console.log(err, "err==========");
      });
  };

  return (
    <Layout>
      <div className="add__banner__styling" onClick={handleAddBanner}>
        <Button text="Add Banner" />
      </div>
      <BannerTable
        showBannerData={showBannerData}
        setBannerId={setBannerId}
        setShowDeleteAlert={setShowDeleteAlert}
        fetchBannerList={fetchBannerList}
      />
      <FormAlertPopUp
        open={showBannerForm}
        onRequestClose={handleAddBannerClose}
      >
        <BannerForm
          onSubmit={onSubmit}
          handleClose={handleAddBannerClose}
          fetchBannerList={fetchBannerList}
        />
      </FormAlertPopUp>

      <AlertPopUp
        open={showDeleteAlert}
        handleOpen={handleShowDeleteAlert}
        handleClose={handleShowDeleteAlerClose}
        header="Delete Alert"
        description="Are you sure you want to delete this banner?"
        submitText="Yes"
        cancelText="No"
        onCancelClick={handleCancelDelete}
        onSubmitClick={handleDelete}
      />
    </Layout>
  );
};

export default Banner;
