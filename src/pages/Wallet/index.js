import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "./style.css";
import Button from "../../components/library/Button";
import FormAlertPopUp from "../../components/FormAlertPopUp";
import { useState } from "react";

const Wallet = () => {
  const [showCreateWallet, setShowCreateWallet] = useState(false);

  const handleCreateWallet = () => {
    setShowCreateWallet(true);
  };

  const handleCreateWalletClose = () => {
    setShowCreateWallet(false);
  };
  return (
    <div>
      <div onClick={handleCreateWallet} className="add__wallet">
        <Button text="Create Wallet" />
      </div>
      <div className="wallet__container">
        <table className="wallet__table">
          <thead>
            <th className="wallet__header">S.No.</th>
            <th className="wallet__header">ID</th>
            <th className="wallet__header">Coin</th>
            <th className="wallet__header">Price</th>
            <th className="wallet__header">Offer Price</th>
            <th className="wallet__header">Created At</th>
            <th className="wallet__header">Updated At</th>
            <th className="wallet__header">Action</th>
          </thead>
          <tbody>
            <td className="wallet__data">1</td>
            <td className="wallet__data">12345</td>
            <td className="wallet__data">1</td>
            <td className="wallet__data">1</td>
            <td className="wallet__data">1</td>
            <td className="wallet__data">1</td>
            <td className="wallet__data">1</td>
            <td className="wallet__data wallet__icons">
              <AiFillEdit className="wallet__edit__icon" />
              <AiFillDelete className="wallet__delete__icon" />
            </td>
          </tbody>
        </table>
      </div>
      <FormAlertPopUp
        open={showCreateWallet}
        handleOpen={handleCreateWallet}
        handleClose={handleCreateWalletClose}
        modalOf="wallet"
      />
    </div>
  );
};

export default Wallet;
