import { useState } from "react";
import UserReportTable from "../../components/Table/UserReportTable";
import "./style.css";
import HostReportTable from "../../components/Table/HostReportTable";

const Report = () => {
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
      {showData === "user" ? <UserReportTable /> : <HostReportTable />}
    </div>
  );
};

export default Report;
