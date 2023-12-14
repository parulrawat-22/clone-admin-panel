import { useState } from "react";
import NotificationTable from "../../components/Table/NotificationTable";
import Button from "../../components/library/Button";
import "./style.css";
import AlertPopUp from "../../components/AlertPopUp";
import SendNotification from "../SendNotification";
import { useNavigate } from "react-router-dom";
// import FormAlertPopUp from "../../components/FormAlertPopUp";
// import NotificationForm from "../../components/formComponents/NotificationForm";

const Notification = () => {
  let navigate = useNavigate();
  // const [showData, setShowData] = useState("user");
  // const [showSendNotification, setShowSendNotification] = useState(false);

  // const handleSendNotification = () => {
  //   setShowSendNotification(true);
  // };

  // const handleSendNotificationClose = () => {
  //   setShowSendNotification(false);
  // };

  return (
    <div>
      <div className="send__notification__btn">
        <Button
          text="Send Notification"
          style={{
            cursor: "pointer",
            textAlign: "center",
          }}
          onClick={() => {
            navigate("/sendnotification");
          }}
        />
      </div>

      <NotificationTable />
      {/* <FormAlertPopUp
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
      </FormAlertPopUp> */}
    </div>
  );
};

export default Notification;
