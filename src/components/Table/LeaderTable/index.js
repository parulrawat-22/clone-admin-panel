import { useState } from "react";
import "./style.css";
import TablePopUp from "../../TablePopUp";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import AlertPopUp from "../../AlertPopUp";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import { NetworkConfiguration } from "../../../network/NetworkConfiguration";
import FormAlertPopUp from "../../FormAlertPopUp";
import AddLeaderForm from "../../formComponents/AddLeaderForm";
// import noData from "../../../base/Animation/No Data Found.json";
import { useApi } from "../../../base/Context/apiProvider";
// import Lottie from "react-lottie";

const LeaderTable = ({ showLeaderList, page, perPage, getAllLeaders }) => {
  const [showHostData, setShowHostData] = useState(false);
  const [id, setId] = useState({});
  const [data, setData] = useState();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const apiProvider = useApi();

  const handleEditAlert = (id, data) => {
    setShowEditAlert(true);
    setId(id);
    setData(data);
  };

  const handleEditAlertClose = () => {
    setShowEditAlert(false);
  };

  const handleDeleteAlert = (id) => {
    setShowDeleteAlert(true);
    setId(id);
  };

  const handleDeleteAlertClose = () => {
    setShowDeleteAlert(false);
  };

  const handleViewHostData = (id) => {
    setShowHostData(true);
    setId(id);
  };

  const handleViewHostDataClose = () => {
    setShowHostData(false);
  };

  const handleDelete = () => {
    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.DELETELEADER + `/${id}`,
      "DELETE"
    )
      .then((res) => {
        setShowDeleteAlert(false);
        getAllLeaders();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = () => {
    setShowEditAlert(false);
    getAllLeaders();
  };

  return (
    <div className="leader__table__container">
      <div className="table_parent_box">
        <table className="leader__table">
          <thead>
            <th className="leader__table__header">S.No.</th>
            <th className="leader__table__header">Leader ID</th>
            <th className="leader__table__header">Name</th>
            <th className="leader__table__header">Gender</th>
            <th className="leader__table__header">Email</th>
            <th className="leader__table__header">Mobile Number</th>
            <th className="leader__table__header">ID Proof</th>
            <th className="leader__table__header">Group Name</th>
            <th className="leader__table__header">Country</th>
            <th className="leader__table__header">State</th>
            <th className="leader__table__header">City</th>
            <th className="leader__table__header">Pin Code</th>
            <th className="leader__table__header">Host</th>
            <th className="leader__table__header">Action</th>
          </thead>
          <tbody>
            {showLeaderList && showLeaderList.length > 0
              ? showLeaderList.map((data, index) => {
                  return (
                    <tr>
                      <td className="leader__table__body">
                        {(page - 1) * perPage + index + 1}
                      </td>
                      <td className="leader__table__body">{data?._id}</td>
                      <td className="leader__table__body">
                        {data?.leaderName}
                      </td>
                      <td className="leader__table__body">{data?.gender}</td>
                      <td className="leader__table__body">{data?.email}</td>
                      <td className="leader__table__body">
                        {data?.mobileNumber}
                      </td>
                      <td className="leader__table__body">{data?.idProof}</td>
                      <td className="leader__table__body">{data?.groupName}</td>
                      <td className="leader__table__body">{data?.country}</td>
                      <td className="leader__table__body">{data?.state}</td>
                      <td className="leader__table__body">{data?.city}</td>
                      <td className="leader__table__body">{data?.pin}</td>
                      {data?._id ? (
                        <td
                          onClick={() => {
                            handleViewHostData(data?._id);
                          }}
                          className="leader__table__body leader__table__view"
                        >
                          View
                        </td>
                      ) : (
                        <td className="leader__table__body">No Data Found</td>
                      )}
                      <td className="leader__table__body">
                        <div style={{ display: "flex" }}>
                          <AiFillEdit
                            onClick={() => handleEditAlert(data?._id, data)}
                            className="leader__edit__icon"
                          />
                          <AiFillDelete
                            onClick={() => handleDeleteAlert(data?._id)}
                            className="leader__delete__icon"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </table>
      </div>

      <FormAlertPopUp
        open={showEditAlert}
        handleOpen={handleEditAlert}
        onRequestClose={handleEditAlertClose}
      >
        <AddLeaderForm
          onSubmit={onSubmit}
          edit={true}
          data={data}
          setData={setData}
          id={id}
        />
      </FormAlertPopUp>

      <AlertPopUp
        open={showDeleteAlert}
        handleOpen={handleDeleteAlert}
        handleClose={handleDeleteAlertClose}
        header="Delete Alert"
        description="Are you sure you want to delete this leader?"
        submitText="Yes"
        cancelText="No"
        onSubmitClick={handleDelete}
        onCancelClick={handleDeleteAlertClose}
      />

      <TablePopUp
        open={showHostData}
        handleClose={handleViewHostDataClose}
        id={id}
      />
    </div>
  );
};

export default LeaderTable;
