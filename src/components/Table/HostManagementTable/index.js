import { useState } from "react";
import AlertPopUp from "../../AlertPopUp";
import "./style.css";

const HostManagementTable = () => {
  const [showDeleteAlert, setShowDeleteAlert] = useState();

  const handleDelete = () => {
    setShowDeleteAlert(true);
  };

  const handleDeleteClose = () => {
    setShowDeleteAlert(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteAlert(false);
  };

  return (
    <div className="host__management__table__container">
      <table className="host__management__table">
        <thead>
          <div className="host__management__data__styling">
            <div>
              <th className="host__management__header">S.No.</th>
              <td className="host__management__data">1</td>
            </div>
            <div>
              <th className="host__management__header">Host ID</th>
              <td className="host__management__data">123456</td>
            </div>
            <div>
              <th className="host__management__header">Name</th>
              <td className="host__management__data">Hiiii</td>
            </div>
            <div>
              <th className="host__management__header">Date Of Birth</th>
              <td className="host__management__data">Hello</td>
            </div>
            <div>
              <th className="host__management__header">Email ID</th>
              <td className="host__management__data">hello123@gmail.com</td>
            </div>
            <div>
              <th className="host__management__header">Mobile Number</th>
              <td className="host__management__data">9876547651</td>
            </div>
            <div>
              <th className="host__management__header">PinCode</th>
              <td className="host__management__data">9876547651</td>
            </div>
            <div>
              <th className="host__management__header">Country</th>
              <td className="host__management__data">9876547651</td>
            </div>
            <div>
              <th className="host__management__header">State</th>
              <td className="host__management__data">9876547651</td>
            </div>
            <div>
              <th className="host__management__header">Profession</th>
              <td className="host__management__data">9876547651</td>
            </div>
            <div>
              <th className="host__management__header">Bio</th>
              <td className="host__management__data">9876547651</td>
            </div>
          </div>
        </thead>
        <tbody></tbody>
      </table>
      <AlertPopUp
        open={showDeleteAlert}
        handleOpen={handleDelete}
        handleClose={handleDeleteClose}
        header="Delete Alert"
        description="Are you sure you want to delete this Host?"
        submitText="Yes"
        cancelText="No"
        onCancelClick={handleCancelDelete}
      />
    </div>
  );
};

export default HostManagementTable;
