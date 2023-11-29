import { useNavigate } from "react-router-dom";
import "./style.css";
import AlertPopUp from "../AlertPopUp";
import { useEffect, useState } from "react";
import FormAlertPopUp from "../FormAlertPopUp";
import PremiumCoin from "../FormAlertPopUp/PremiumCoin";
import Helpline from "../FormAlertPopUp/Helpline";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";

const PopMenu = ({ popOpen, children }) => {
  const [logoutAlert, setLogoutAlert] = useState(false);
  const [premiumCoins, setPremiumCoins] = useState(false);
  const [showHelplineNumber, setShowHelplineNumber] = useState(false);
  const [helplineNumber, setHelplineNumber] = useState("");
  const [id, setId] = useState("");

  let navigate = useNavigate();

  const handleLogout = () => {
    console.log("sorry");
    localStorage.clear();
    navigate("/");
  };

  const handleLogoutAlert = () => {
    setLogoutAlert(true);
  };

  const handleLogoutAlertClose = () => {
    setLogoutAlert(false);
  };

  const handlePremiumCoin = () => {
    setPremiumCoins(true);
  };

  const handlePremiumCoinClose = () => {
    setPremiumCoins(false);
  };

  const onSubmit = () => {
    setPremiumCoins(false);
    setShowHelplineNumber(false);
  };

  const handleHelplineNumber = (id) => {
    setShowHelplineNumber(true);
  };

  const handleHelplineNumberClose = () => {
    setShowHelplineNumber(false);
  };

  useEffect(() => {
    fetchHelplineNumber();
  }, []);

  const fetchHelplineNumber = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETHELPLINENUMBER, "GET")
      .then((res) => {
        setHelplineNumber(res?.result[0]?.mobileNumber);
        setId(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {children}
      <div
        style={{ display: popOpen ? "block" : "none" }}
        className="pop_container"
      >
        <div className="popup_text">
          <p
            className="logout_para"
            onClick={() => {
              navigate("/editprofile");
            }}
          >
            Change Password
          </p>
          <p className="logout_para" onClick={handlePremiumCoin}>
            Set Premium Coins
          </p>
          <p className="logout_para" onClick={handleHelplineNumber}>
            Helpline
          </p>
          <p className="logout_para" onClick={handleLogoutAlert}>
            Logout
          </p>
        </div>
      </div>

      <AlertPopUp
        open={logoutAlert}
        handleOpen={handleLogoutAlert}
        handleClose={handleLogoutAlertClose}
        header="Logout"
        description="Are you sure you want to Logout?"
        submitText="Yes"
        cancelText="No"
        onCancelClick={handleLogoutAlertClose}
        onSubmitClick={handleLogout}
      ></AlertPopUp>

      <FormAlertPopUp
        open={premiumCoins}
        handleOpen={handlePremiumCoin}
        onRequestClose={handlePremiumCoinClose}
      >
        <PremiumCoin onSubmit={onSubmit} />
      </FormAlertPopUp>

      <FormAlertPopUp
        open={showHelplineNumber}
        handleOpen={handleHelplineNumber}
        onRequestClose={handleHelplineNumberClose}
      >
        <Helpline helplineNumber={helplineNumber} onSubmit={onSubmit} />
      </FormAlertPopUp>
    </div>
  );
};

export default PopMenu;
