import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import LeaderTable from "../../components/Table/LeaderTable";
import Button from "../../components/library/Button";
import "./style.css";
import FormAlertPopUp from "../../components/FormAlertPopUp";
import AddLeaderForm from "../../components/formComponents/AddLeaderForm";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";

const Leader = () => {
  const [showAddLeaderAlert, setshowAddLeaderAlert] = useState(false);
  const [showLeaderList, setShowLeaderList] = useState([]);

  const handleAddLeader = () => {
    setshowAddLeaderAlert(true);
  };

  const handleAddLeaderClose = () => {
    setshowAddLeaderAlert(false);
  };

  useEffect(() => {
    getAllLeaders();
  }, []);

  const getAllLeaders = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETLEADER, "GET")
      .then((res) => {
        setShowLeaderList(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = () => {
    console.log("Parul");
    setshowAddLeaderAlert(false);
    getAllLeaders();
  };

  return (
    <Layout>
      <div className="add__leader__styling">
        <Button text="Add Leader" onClick={handleAddLeader} />
      </div>
      <LeaderTable showLeaderList={showLeaderList} />
      <FormAlertPopUp
        open={showAddLeaderAlert}
        onRequestClose={handleAddLeaderClose}
      >
        <AddLeaderForm onSubmit={onSubmit} handleClose={handleAddLeaderClose} />
      </FormAlertPopUp>
    </Layout>
  );
};

export default Leader;
