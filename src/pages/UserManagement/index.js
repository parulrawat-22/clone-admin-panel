import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import IconContainer from "../../components/pages/userManagement/IconComponent";
import SuspendUser from "../../components/pages/userManagement/SuspendUser";
import UserDetails from "../../components/pages/userManagement/UserDetails";
import WarnUser from "../../components/pages/userManagement/WarnUser";
import "./style.css";
import Button from "../../components/library/Button";
import { useState } from "react";
import AlertPopUp from "../../components/AlertPopUp";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import { useApi } from "../../base/Context/apiProvider";
import { NetworkConfiguration } from "../../network/NetworkConfiguration";

const UserManagement = () => {
  const [showBlockAlert, setShowBlockAlert] = useState(false);
  const apiProvider = useApi();
  const [reason, setReason] = useState("");
  const { id } = useParams();

  const handleBlockUser = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.BLOCKUSER,
      "PUT",
      {
        id,
        blockReasion: reason,
      }
    )
      .then((res) => {
        console.log(res);
        setShowBlockAlert(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBlockClick = () => {
    setShowBlockAlert(true);
  };

  const handleBlockClickClose = () => {
    setShowBlockAlert(false);
  };

  return (
    <div className="user__management__container">
      <div
        style={{ display: "flex", justifyContent: "flex-end", height: "3rem" }}
      >
        <Button
          style={{
            backgroundColor: "#fe3b3b",
            width: "8rem",
            fontSize: "18px",
            textAlign: "center",
          }}
          text="Block User"
          onClick={handleBlockClick}
        />
      </div>
      <div className="user__management__profile_details">
        <UserDetails id={id} />
      </div>

      <div className="user__management__icon_suspend_warn_user">
        <IconContainer id={id} />
        <div className="user__management__action">
          <SuspendUser />
          <WarnUser />
        </div>
      </div>

      <AlertPopUp
        open={showBlockAlert}
        handleClose={handleBlockClickClose}
        handleOpen={handleBlockClick}
        header="Block Alert"
        description="Are you sure you want to block this user?"
        submitText="Yes"
        cancelText="No"
        onSubmitClick={handleBlockUser}
        onCancelClick={handleBlockClickClose}
      />
    </div>
  );
};

export default UserManagement;
