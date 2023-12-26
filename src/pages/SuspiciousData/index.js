import { useState } from "react";
import "./style.css";
import UserSuspiciousData from "../../components/Table/UserSuspiciousDataTable";
import HostSuspiciousData from "../../components/Table/HostSuspiciousDataTable";

const SuspiciousData = () => {
  const [showData, setShowData] = useState("user");

  const handleUserData = () => {
    setShowData("user");
  };
  const handleHostData = () => {
    setShowData("host");
  };
  return (
    <div>
      <div className="feedback__user__host__toggle">
        <div className="feedback_toggle_btns">
          <p
            className={
              showData === "user"
                ? "feedback__toggle__active__button"
                : "feedback__toggle__inactive__button"
            }
            onClick={handleUserData}
          >
            User
          </p>
          <p
            className={
              showData === "host"
                ? "feedback__toggle__active__button"
                : "feedback__toggle__inactive__button"
            }
            onClick={handleHostData}
          >
            Host
          </p>
        </div>
      </div>
      {showData === "user" ? <UserSuspiciousData /> : <HostSuspiciousData />}
    </div>
  );
};

export default SuspiciousData;
