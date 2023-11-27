import { useEffect, useState } from "react";
import "./style.css";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import TablePopUp from "../../TablePopUp";

const LeaderTable = () => {
  const [showHostData, setShowHostData] = useState(false);
  const [showHostList, setShowHostList] = useState([]);
  const [showLeaderList, setShowLeaderList] = useState([]);
  const [id, setId] = useState("");

  const handleViewHostData = () => {
    setShowHostData(true);
  };

  const handleViewHostDataClose = () => {
    setShowHostData(false);
  };

  const handleHostData = (id) => {
    setId(id);
  };

  const fetchHostData = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETLEADERHOSTS + id, "GET")
      .then((res) => {
        setShowHostList(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
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
  return (
    <div className="leader__table__container">
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
        </thead>
        <tbody>
          {showLeaderList.map((data, index) => {
            return (
              <tr>
                <td className="leader__table__body">{index + 1}</td>
                <td className="leader__table__body">{data.leaderId}</td>
                <td className="leader__table__body">{data.leaderName}</td>
                <td className="leader__table__body">{data.gender}</td>
                <td className="leader__table__body">{data.email}</td>
                <td className="leader__table__body">{data.mobileNumber}</td>
                <td className="leader__table__body">{data.idProof}</td>
                <td className="leader__table__body">{data.groupName}</td>
                <td className="leader__table__body">{data.country}</td>
                <td className="leader__table__body">{data.state}</td>
                <td className="leader__table__body">{data.city}</td>
                <td className="leader__table__body">{data.pin}</td>
                <td
                  onClick={() => {
                    handleHostData(data?._id);
                  }}
                  className="leader__table__body leader__table__view"
                >
                  View
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <TablePopUp
        open={showHostData}
        handleOpen={handleViewHostData}
        handleClose={handleViewHostDataClose}
      />
    </div>
  );
};

export default LeaderTable;
