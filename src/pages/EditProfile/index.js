import { useNavigate } from "react-router-dom";
import "./style.css";
import FormAlertPopUp from "../../components/FormAlertPopUp";
import PremiumCoin from "../../components/FormAlertPopUp/PremiumCoin";
import { useState } from "react";

const EditProfile = () => {
  const [premiumCoins, setPremiumCoins] = useState(false);

  const handlePremiumCoin = () => {
    setPremiumCoins(true);
  };

  const handlePremiumCoinClose = () => {
    setPremiumCoins(false);
  };

  let navigate = useNavigate();
  return (
    <div className="edit__profile__container">
      <div className="edit__profile__wrapper">
        <p className="edit__profile__content" onClick={handlePremiumCoin}>
          Set Premium Coins
        </p>
      </div>
      <div className="edit__profile__wrapper">
        <p className="edit__profile__content">Set Random Call Time</p>
      </div>
      <div className="edit__profile__wrapper">
        <p
          className="edit__profile__content"
          onClick={() => {
            navigate("/editpassword");
          }}
        >
          Set New Password{" "}
        </p>
      </div>
      <div className="edit__profile__wrapper">
        <p className="edit__profile__content">Set</p>
      </div>
      <FormAlertPopUp
        open={premiumCoins}
        handleOpen={handlePremiumCoin}
        onRequestClose={handlePremiumCoinClose}
      >
        <PremiumCoin />
      </FormAlertPopUp>
    </div>
  );
};

export default EditProfile;
