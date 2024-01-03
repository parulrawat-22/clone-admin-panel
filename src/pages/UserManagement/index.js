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
  const { id } = useParams();

  return (
    <div className="user__management__container">
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
    </div>
  );
};

export default UserManagement;
