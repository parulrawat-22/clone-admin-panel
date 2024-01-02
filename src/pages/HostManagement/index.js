// import Layout from "../../components/Layout";
import HostManagementTable from "../../components/Table/HostManagementTable";
import Button from "../../components/library/Button";
import HostIconContainer from "../../components/pages/hostManagement/HostIconComponent";
import SuspendHost from "../../components/pages/hostManagement/SuspendHost";
import WarnedHost from "../../components/pages/hostManagement/WarnHost";

import "./style.css";
import { useParams } from "react-router-dom";

const HostManagement = () => {
  const { id } = useParams();

  return (
    <div className="user__management__container">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          height: "3rem",
        }}
      >
        <Button
          style={{
            backgroundColor: "#fe3b3b",
            width: "8rem",
            fontSize: "18px",
            textAlign: "center",
          }}
          text="Block Host"
          // onClick={handleBlockClick}
        />
      </div>
      <div className="user__management__profile_details">
        <HostManagementTable id={id} />
      </div>

      <div className="user__management__icon_suspend_warn_user">
        <HostIconContainer id={id} />
        <div className="user__management__action">
          <SuspendHost />
          <WarnedHost />
        </div>
      </div>
    </div>
  );
};

export default HostManagement;
