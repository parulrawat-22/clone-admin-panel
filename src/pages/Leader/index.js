import { useState } from "react";
import Layout from "../../components/Layout";
import LeaderTable from "../../components/Table/LeaderTable";
import Button from "../../components/library/Button";
import "./style.css";
import FormAlertPopUp from "../../components/FormAlertPopUp";

const Leader = () => {
  const [showAddLeaderAlert, setshowAddLeaderAlert] = useState(false);

  const handleAddLeader = () => {
    setshowAddLeaderAlert(true);
  };

  const handleAddLeaderClose = () => {
    setshowAddLeaderAlert(false);
  };
  return (
    <Layout>
      <div className="add__leader__styling" onClick={handleAddLeader}>
        <Button text="Add Leader" />
      </div>
      <LeaderTable />
      <FormAlertPopUp
        open={showAddLeaderAlert}
        handleOpen={handleAddLeader}
        handleClose={handleAddLeaderClose}
        modalOf="leader"
      />
    </Layout>
  );
};

export default Leader;
