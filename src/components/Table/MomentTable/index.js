import { BsFillEyeFill } from "react-icons/bs";
import "./style.css";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { useState } from "react";
import AlertPopUp from "../../AlertPopUp";
import { useNavigate } from "react-router-dom";

const MomentTable = () => {
  let navigate = useNavigate();
  const [showDeleteAlert, setShowDeleteAlert] = useState();

  const handleDeleteAlert = () => {
    setShowDeleteAlert(true);
  };

  const handleDeleteAlertClose = () => {
    setShowDeleteAlert(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteAlert(false);
    navigate("/moment");
  };

  return (
    <div className="moment__container">
      <table className="moment__table__container">
        <thead>
          <th className="moment__table__head">S.No</th>
          <th className="moment__table__head">Date</th>
          <th className="moment__table__head">Caption</th>
          <th className="moment__table__head">Likes</th>
          <th className="moment__table__head">Image/Video</th>
          <th className="moment__table__head">Action</th>
        </thead>
        <tbody>
          <td className="moment__table__body">1</td>
          <td className="moment__table__body">12/10/23</td>
          <td className="moment__table__body">Hey there!</td>
          <td className="moment__table__body">43</td>
          <td className="moment__table__body">
            <BsFillEyeFill className="moment__table__body__eye_icon" />
          </td>
          <td className="moment__table__body moment__table__body_icons">
            <AiFillEdit className="moment__table__edit_icon" />
            <AiTwotoneDelete
              onClick={handleDeleteAlert}
              className="moment__table__delete_icon"
            />
          </td>
        </tbody>
      </table>
      <AlertPopUp
        open={showDeleteAlert}
        handleOpen={handleDeleteAlert}
        handleClose={handleDeleteAlertClose}
        header="Delete Moment?"
        description="Are you sure you want to delete this Moment?"
        submitText="Yes"
        onCancelClick={handleDeleteCancel}
        cancelText="No"
      />
    </div>
  );
};

export default MomentTable;
