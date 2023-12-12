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
import SearchInput from "../../components/SearchInput";
import { FiSearch } from "react-icons/fi";

const Leader = () => {
  const [showAddLeaderAlert, setshowAddLeaderAlert] = useState(false);
  const [showLeaderList, setShowLeaderList] = useState([]);
  const [value, setValue] = useState("");

  const handleAddLeader = () => {
    setshowAddLeaderAlert(true);
  };

  const handleAddLeaderClose = () => {
    setshowAddLeaderAlert(false);
  };

  useEffect(() => {
    getAllLeaders();
  }, [value]);

  const getAllLeaders = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETLEADER, "POST", {
      key: value,
    })
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

  const searchIcon = () => {
    return <FiSearch />;
  };

  const handleText = (e) => {
    setValue(e.target.value);
  };

  return (
    <Layout>
      <div className="add__leader__styling">
        <Button text="Add Leader" onClick={handleAddLeader} />
      </div>
      <div className="banner__search__btn">
        <SearchInput
          value={value}
          onChange={handleText}
          placeholder="Search"
          icon={searchIcon()}
        />
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
