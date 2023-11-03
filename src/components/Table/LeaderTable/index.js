import { useState } from "react";
import "./style.css";
import AlertPopUp from "../../AlertPopUp";

const LeaderTable = () => {
  const [showHostData, setShowHostData] = useState(false);

  const handleViewHostData = () => {
    setShowHostData(true);
  };

  const handleViewHostDataClose = () => {
    setShowHostData(false);
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
          <td className="leader__table__body">1</td>
          <td className="leader__table__body">1</td>
          <td className="leader__table__body">1</td>
          <td className="leader__table__body">1</td>
          <td className="leader__table__body">1</td>
          <td className="leader__table__body">1</td>
          <td className="leader__table__body">1</td>
          <td className="leader__table__body">1</td>
          <td className="leader__table__body">1</td>
          <td className="leader__table__body">1</td>
          <td className="leader__table__body">1</td>
          <td className="leader__table__body">1</td>
          <td
            onClick={handleViewHostData}
            className="leader__table__body leader__table__view"
          >
            View
          </td>
        </tbody>
      </table>
      <AlertPopUp
        open={showHostData}
        handleOpen={handleViewHostData}
        handleClose={handleViewHostDataClose}
      />
    </div>
  );
};

export default LeaderTable;
