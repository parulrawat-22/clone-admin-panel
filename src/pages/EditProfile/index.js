import "./style.css";
import FormAlertPopUp from "../../components/FormAlertPopUp";
import PremiumCoin from "../../components/FormAlertPopUp/PremiumCoin";
import { useState } from "react";
import { SetRandomCallTime } from "../../components/FormAlertPopUp/SetRandomCallTime";
import RandomCallCharge from "../../components/FormAlertPopUp/RandomCallCharge";
import ChangePassword from "../../components/FormAlertPopUp/ChangePassword";
import NormalCallTime from "../../components/FormAlertPopUp/NormalCallChargeTime";
import AudioChargeCall from "../../components/FormAlertPopUp/AudioCallChargeTime";

const EditProfile = () => {
  const [premiumCoins, setPremiumCoins] = useState(false);
  const [showRandomCallTime, setShowRandomCallTime] = useState(false);
  const [showRandomCallCharge, setShowRandomCallCharge] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showNormalChargeTime, setShowNormalChargeTime] = useState(false);
  const [audioCallChargeTime, setAudioCallChargeTime] = useState(false);

  const handlePremiumCoin = () => {
    setPremiumCoins(true);
  };

  const handlePremiumCoinClose = () => {
    setPremiumCoins(false);
    console.log("HI this  is Parul");
  };

  const handleRandomCall = () => {
    setShowRandomCallTime(true);
  };

  const handleRandomCallClose = () => {
    setShowRandomCallTime(false);
    console.log("ertyuio");
  };

  const handleCallCharge = () => {
    setShowRandomCallCharge(true);
  };

  const handleCallChargeClose = () => {
    setShowRandomCallCharge(false);
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
  };

  const handleChangePasswordClose = () => {
    setShowChangePassword(false);
  };

  const handleNormalCallCharge = () => {
    setShowNormalChargeTime(true);
  };

  const handleNormalCallChargeClose = () => {
    setShowNormalChargeTime(false);
  };

  const handleAudioCallCharge = () => {
    setAudioCallChargeTime(true);
  };

  const handleAudioCallChargeClose = () => {
    setAudioCallChargeTime(false);
  };

  const onSubmit = () => {
    setPremiumCoins(false);
    setShowRandomCallTime(false);
    setShowRandomCallCharge(false);
    setShowChangePassword(false);
    setShowNormalChargeTime(false);
    setAudioCallChargeTime(false);
  };

  return (
    <div className="edit__profile__container">
      <div className="edit__profile__wrapper">
        <p className="edit__profile__content" onClick={handlePremiumCoin}>
          Set Premium Coins
        </p>
      </div>
      <div className="edit__profile__wrapper" onClick={handleRandomCall}>
        <p className="edit__profile__content">Set Random Call Time</p>
      </div>
      <div className="edit__profile__wrapper">
        <p className="edit__profile__content" onClick={handleChangePassword}>
          Set New Password{" "}
        </p>
      </div>
      <div className="edit__profile__wrapper" onClick={handleCallCharge}>
        <p className="edit__profile__content">Set Random Call Charge</p>
      </div>

      <div className="edit__profile__wrapper" onClick={handleAudioCallCharge}>
        <p className="edit__profile__content">Set Audio Call Charge Time</p>
      </div>

      <div className="edit__profile__wrapper" onClick={handleNormalCallCharge}>
        <p className="edit__profile__content">Set Normal Call Charge Time</p>
      </div>
      <FormAlertPopUp
        open={premiumCoins}
        handleOpen={handlePremiumCoin}
        onRequestClose={handlePremiumCoinClose}
      >
        <PremiumCoin onSubmit={onSubmit} />
      </FormAlertPopUp>

      <FormAlertPopUp
        open={showRandomCallTime}
        onRequestClose={handleRandomCallClose}
        handleOpen={handleRandomCall}
      >
        <SetRandomCallTime onSubmit={onSubmit} />
      </FormAlertPopUp>

      <FormAlertPopUp
        open={showRandomCallCharge}
        handleOpen={handleCallCharge}
        onRequestClose={handleCallChargeClose}
      >
        <RandomCallCharge onSubmit={onSubmit} />
      </FormAlertPopUp>

      <FormAlertPopUp
        open={showChangePassword}
        handleOpen={handleChangePassword}
        onRequestClose={handleChangePasswordClose}
      >
        <ChangePassword onSubmit={onSubmit} />
      </FormAlertPopUp>

      <FormAlertPopUp
        open={showNormalChargeTime}
        handleOpen={handleNormalCallCharge}
        onRequestClose={handleNormalCallChargeClose}
      >
        <NormalCallTime onSubmit={onSubmit} />
      </FormAlertPopUp>

      <FormAlertPopUp
        open={audioCallChargeTime}
        handleOpen={handleAudioCallCharge}
        onRequestClose={handleAudioCallChargeClose}
      >
        <AudioChargeCall onSubmit={onSubmit} />
      </FormAlertPopUp>
    </div>
  );
};

export default EditProfile;
