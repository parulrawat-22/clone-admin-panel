import { useState } from "react";
import Layout from "../../components/Layout";
import Button from "../../components/library/Button";
import BannerTable from "../../Constant/BannerTable";
import FormAlertPopUp from "../../components/FormAlertPopUp";
import "./style.css";

const Banner = () => {
  const [showBannerForm, setShowBannerForm] = useState(false);

  const handleAddBanner = () => {
    setShowBannerForm(true);
  };

  const handleAddBannerClose = () => {
    setShowBannerForm(false);
  };

  return (
    <Layout>
      <div className="add__banner__styling" onClick={handleAddBanner}>
        <Button text="Add Banner" />
      </div>
      <BannerTable />
      <FormAlertPopUp
        open={showBannerForm}
        handleOpen={handleAddBanner}
        handleClose={handleAddBannerClose}
        modalOf="banner"
      />
    </Layout>
  );
};

export default Banner;
