import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import "./style.css";
import WarnedUserTable from "../../components/Table/WarnedUserTable";
import WarnedHostTable from "../../components/Table/WarnedHostTable";
import { useSearchParams } from "react-router-dom";

const WarnedUsers = () => {
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
      {showData === "user" ? <WarnedUserTable /> : <WarnedHostTable />}
    </Layout>
  );
};

export default WarnedUsers;
