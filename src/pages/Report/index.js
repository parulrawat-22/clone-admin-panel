import { useState } from "react";
import Layout from "../../components/Layout";
import UserReportTable from "../../components/Table/UserReportTable";
import "./style.css";
import HostFeedbackTable from "../../components/Table/HostFeedbackTable";
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
    <Layout>
      <div className="report__user__host__toggle">
        <div className="report_toggle_btns">
          <p
            className={
              showData === "user"
                ? "report__toggle__active__button"
                : "report__toggle__inactive__button"
            }
            onClick={handleUserData}
          >
            User
          </p>
          <p
            className={
              showData === "host"
                ? "report__toggle__active__button"
                : "report__toggle__inactive__button"
            }
            onClick={handleHostData}
          >
            Host
          </p>
        </div>
      </div>
      {showData === "user" ? <UserReportTable /> : <HostReportTable />}
    </Layout>
  );
};

export default Report;
