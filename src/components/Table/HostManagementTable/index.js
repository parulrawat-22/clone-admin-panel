import { BsEyeFill } from "react-icons/bs";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
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
          <th className="host__management__header">S.No.</th>
          <th className="host__management__header">Host ID</th>
          <th className="host__management__header">First Name</th>
          <th className="host__management__header">Last Name</th>
          <th className="host__management__header">Email ID</th>
          <th className="host__management__header">Mobile Number</th>
          <th className="host__management__header">Login Status</th>
          <th className="host__management__header">View Profile</th>
          <th className="host__management__header">Action</th>
        </thead>
        <tbody>
          <td className="host__management__data">1</td>
          <td className="host__management__data">123456</td>
          <td className="host__management__data">Hiiii</td>
          <td className="host__management__data">Hello</td>
          <td className="host__management__data">hello123@gmail.com</td>
          <td className="host__management__data">9876547651</td>
          <td className="host__management__data">9876547651</td>
          <td className="host__management__data">
            <BsEyeFill className="host__management_eye__icon" />
          </td>
          <td className="host__management__data">
            <AiFillEdit className="host__management_edit__icon" />
            <AiFillDelete
              onClick={handleDelete}
              className="host__management_delete__icon"
            />
          </td>
        </tbody>
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
