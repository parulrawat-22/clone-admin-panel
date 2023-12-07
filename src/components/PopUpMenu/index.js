import { useNavigate } from "react-router-dom";
import "./style.css";
import AlertPopUp from "../AlertPopUp";
import { useState } from "react";
import FormAlertPopUp from "../FormAlertPopUp";
import Helpline from "../FormAlertPopUp/Helpline";

const PopMenu = ({ popOpen, children }) => {
  const [logoutAlert, setLogoutAlert] = useState(false);
  const [showHelplineNumber, setShowHelplineNumber] = useState(false);

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

  const onSubmit = () => {
    setShowHelplineNumber(false);
  };

  const handleHelplineNumber = () => {
    setShowHelplineNumber(true);
  };

  const handleHelplineNumberClose = () => {
    setShowHelplineNumber(false);
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
            Edit Profile
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
        open={showHelplineNumber}
        handleOpen={handleHelplineNumber}
        onRequestClose={handleHelplineNumberClose}
      >
        <Helpline onSubmit={onSubmit} />
      </FormAlertPopUp>
    </div>
  );
};

export default PopMenu;
