import { BsFillEyeFill } from "react-icons/bs";
import "./style.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Button from "../../library/Button";
import FormAlertPopUp from "../../FormAlertPopUp";
import { useState } from "react";

const GiftTable = () => {
  const [showGiftForm, setShowGiftForm] = useState(false);

  const handleAddGift = () => {
    setShowGiftForm(true);
  };

  const handleAddGiftClose = () => {
    setShowGiftForm(false);
  };
  return (
    <div>
      <div onClick={handleAddGift} className="add__gift">
        <Button text="Add Gift" />
      </div>
      <div className="gift__container">
        <table className="gift__table__container">
          <thead>
            <th className="gift__table__heading">S.No</th>
            <th className="gift__table__heading">Gift Name</th>
            <th className="gift__table__heading">Gift Image</th>
            <th className="gift__table__heading">Gift Price</th>
            <th className="gift__table__heading">Offer Price</th>
            <th className="gift__table__heading">Created At</th>
            <th className="gift__table__heading">Updated At</th>
            <th className="gift__table__heading">Action</th>
          </thead>

          <tbody>
            <td className="gift__table__body">1</td>
            <td className="gift__table__body">Suman</td>
            <td className="gift__table__body">
              <BsFillEyeFill />
            </td>
            <td className="gift__table__body">1</td>
            <td className="gift__table__body">1</td>
            <td className="gift__table__body">1</td>
            <td className="gift__table__body">1</td>
            <td className="gift__table__body">
              <AiFillEdit className="gift__table__edit__icon" />
              <AiFillDelete className="gift__table__delete__icon" />
            </td>
          </tbody>
        </table>
      </div>
      <FormAlertPopUp
        open={showGiftForm}
        handleOpen={handleAddGift}
        handleClose={handleAddGiftClose}
        modalOf="gift"
      />
    </div>
  );
};

export default GiftTable;
