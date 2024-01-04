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
import Pagination from "../../components/Pagination";
import { useApi } from "../../base/Context/apiProvider";
import noData from "../../base/Animation/No Data Found.json";

import Lottie from "react-lottie";

const Leader = () => {
  const [showAddLeaderAlert, setshowAddLeaderAlert] = useState(false);
  const [showLeaderList, setShowLeaderList] = useState([]);
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const apiProvider = useApi();

  const handleAddLeader = () => {
    setshowAddLeaderAlert(true);
  };

  const handleAddLeaderClose = () => {
    setshowAddLeaderAlert(false);
  };

  useEffect(() => {
    getAllLeaders();
  }, [value, page, perPage, apiProvider?.apiUrl]);

  const getAllLeaders = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.GETLEADER,
      "POST",
      {
        key: value,
        page,
        perPage,
      }
    )
      .then((res) => {
        setShowLeaderList(res.result);
        setTotalCount(res?.totalCount);
        setTotalPages(res?.totalPages);
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

      <LeaderTable
        page={page}
        perPage={perPage}
        showLeaderList={showLeaderList}
        getAllLeaders={getAllLeaders}
      />
      <FormAlertPopUp
        open={showAddLeaderAlert}
        onRequestClose={handleAddLeaderClose}
      >
        <AddLeaderForm onSubmit={onSubmit} handleClose={handleAddLeaderClose} />
      </FormAlertPopUp>

      {showLeaderList && showLeaderList.length > 0 ? (
        <Pagination
          page={page}
          setPage={setPage}
          perPage={perPage}
          setPerPage={setPerPage}
          totalCount={totalCount}
          totalPages={totalPages}
          options={[5, 10, 15, 20]}
        />
      ) : (
        <div className="host__no__data__found__icon">
          <Lottie
            options={{ animationData: noData, loop: true }}
            style={{ width: "20rem", height: "20rem" }}
          />
          <p className="no__data__found">No Data Found</p>
        </div>
      )}
    </Layout>
  );
};

export default Leader;
