import { useState } from "react";
import Layout from "../../components/Layout";
import MomentTable from "../../components/Table/MomentTable";
import "./style.css";
import HostMomentTable from "../../components/Table/HostMomentTable";

const Moments = () => {
  const [showData, setShowData] = useState("user");

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
      {showData === "user" ? <MomentTable /> : <HostMomentTable />}
    </Layout>
  );
};

export default Moments;
