import { useState } from "react";
import Layout from "../../components/Layout";
import "./style.css";
import WarnedUserTable from "../../components/Table/WarnedUserTable";
import WarnedHostTable from "../../components/Table/WarnedHostTable";

const WarnedUsers = () => {
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
      {showData === "user" ? <WarnedUserTable /> : <WarnedHostTable />}
    </Layout>
  );
};

export default WarnedUsers;
