import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import "./style.css";
import SuspendedUserTable from "../../components/Table/SuspendedUserTable";
import SuspendedHostTable from "../../components/Table/SuspendedHostTable";
import { useSearchParams } from "react-router-dom";

const SuspendedUsers = () => {
  const [showData, setShowData] = useState("user");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("type")) setShowData(searchParams.get("type"));
  }, [searchParams]);

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
      {showData === "user" ? <SuspendedUserTable /> : <SuspendedHostTable />}
    </Layout>
  );
};

export default SuspendedUsers;
