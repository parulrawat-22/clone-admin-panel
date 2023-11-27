import { useState } from "react";
import NotificationTable from "../../components/Table/NotificationTable";
import Button from "../../components/library/Button";
import "./style.css";
import FormAlertPopUp from "../../components/FormAlertPopUp";
import NotificationForm from "../../components/formComponents/NotificationForm";

const Notification = () => {
  const [showData, setShowData] = useState("user");
  const [showSendNotification, setShowSendNotification] = useState(false);

  const handleSendNotification = () => {
    setShowSendNotification(true);
  };

  const handleSendNotificationClose = () => {
    setShowSendNotification(false);
  };

  const handleUserData = () => {
    setShowData("user");
  };

  const handleHostData = () => {
    setShowData("host");
  };

  return (
    <div>
      <div className="report__user__host__toggle send__notification__btn">
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
        <Button text="Send Notification" onClick={handleSendNotification} />
      </div>

      <NotificationTable />
      <FormAlertPopUp
        open={showSendNotification}
        onRequestClose={handleSendNotificationClose}
      >
        <NotificationForm
          dropdownOptions={[
            {
              name: "--Select--",
            },
            {
              name: "Users",
              value: "Users",
            },
            {
              name: "Hosts",
              value: "Hosts",
            },
            {
              name: "Both",
              value: "Both",
            },
          ]}
        />
      </FormAlertPopUp>
    </div>
  );
};

export default Notification;
