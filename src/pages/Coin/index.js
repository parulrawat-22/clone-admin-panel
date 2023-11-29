import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "./style.css";
import Button from "../../components/library/Button";
import FormAlertPopUp from "../../components/FormAlertPopUp";
import { useEffect, useState } from "react";
import CreateWalletForm from "../../components/formComponents/CreateWalletForm";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";
import moment from "moment";
import AlertPopUp from "../../components/AlertPopUp";

const Coin = () => {
  const [showCreateWallet, setShowCreateWallet] = useState(false);
  const [getCoin, setGetCoin] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [id, setId] = useState("");

  const handleDeleteAlert = () => {
    setShowDeleteAlert(true);
  };

  const handleDeleteAlertClose = () => {
    setShowDeleteAlert(false);
  };
  useEffect(() => {
    fetchCoin();
  }, []);

  const fetchCoin = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETWALLET, "GET")
      .then((res) => {
        setGetCoin(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnClickAlert = (id) => {
    setId(id);
    setShowDeleteAlert(true);
  };

  const handleDelete = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.DELETECOIN + `/${id}`,
      "DELETE"
    )
      .then((res) => {
        setShowDeleteAlert(false);
        fetchCoin();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = () => {
    setShowCreateWallet(false);
    fetchCoin();
  };

  const handleCreateWallet = () => {
    setShowCreateWallet(true);
  };

  const handleCreateWalletClose = () => {
    setShowCreateWallet(false);
  };
  return (
    <div>
      <div onClick={handleCreateWallet} className="add__wallet">
        <Button text="Create Coin" />
      </div>
      <div className="wallet__container">
        <table className="wallet__table">
          <thead>
            <th className="wallet__header">S.No.</th>
            <th className="wallet__header">Coin</th>
            <th className="wallet__header">Price</th>
            <th className="wallet__header">Offer Price</th>
            <th className="wallet__header">Created At</th>
            <th className="wallet__header">Updated At</th>
            <th className="wallet__header">Action</th>
          </thead>
          <tbody>
            {getCoin.map((data, index) => {
              return (
                <tr>
                  <td className="wallet__data">{index + 1}</td>
                  <td className="wallet__data">{data?.coins}</td>
                  <td className="wallet__data">{data?.price}</td>
                  <td className="wallet__data">{data?.offer}</td>
                  <td className="wallet__data">
                    {moment(data?.createdAt).format("DD/MM/YYYY LT")}
                  </td>
                  <td className="wallet__data">
                    {moment(data?.updatedAt).format("DD/MM/YYYY LT")}
                  </td>
                  <td className="wallet__data wallet__icons">
                    <AiFillEdit className="wallet__edit__icon" />
                    <AiFillDelete
                      onClick={() => {
                        handleOnClickAlert(data._id);
                      }}
                      className="wallet__delete__icon"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <FormAlertPopUp
        open={showCreateWallet}
        onRequestClose={handleCreateWalletClose}
        modalOf="wallet"
      >
        <CreateWalletForm onSubmit={onSubmit} />
      </FormAlertPopUp>

      <AlertPopUp
        open={showDeleteAlert}
        handleOpen={handleDeleteAlert}
        handleClose={handleDeleteAlertClose}
        header="Delete Alert"
        description="Are you sure you want to delete this coin?"
        submitText="Yes"
        cancelText="No"
        onSubmitClick={handleDelete}
        onCancelClick={handleDeleteAlertClose}
      />
    </div>
  );
};

export default Coin;
