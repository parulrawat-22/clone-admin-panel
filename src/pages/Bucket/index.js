import { useEffect, useState } from "react";
import EditCoins from "../../components/pages/bucket/EditCoins";
import "./style.css";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";
import { useLoader } from "../../base/Context/loaderProvider";
import moment from "moment";
import Coin from "../../base/Assets/walletCoin.png";
import { AiFillDelete } from "react-icons/ai";
import AlertPopUp from "../../components/AlertPopUp";
import { errorToast, successToast } from "../../utils/toast";

const Bucket = () => {
  const [bucket, setBucket] = useState([]);
  const { id } = useParams();
  const [amount, setAmount] = useState("");
  const [identity, setIdentity] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleDeleteAlert = (identity) => {
    setShowDeleteAlert(true);
    setIdentity(identity);
  };

  const handleDeleteAlertClose = () => {
    setShowDeleteAlert(false);
  };

  const loader = useLoader();

  const handleCoin = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETBUCKETLIST, "POST", {
      userId: id,
    })
      .then((res) => {
        console.log(res);
        setBucket(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchBucketAmount();
    handleCoin();
  }, []);

  const fetchBucketAmount = () => {
    loader.showLoader(true);
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETAMOUNT + `/${id}`, "GET")
      .then((res) => {
        console.log(res);
        loader.showLoader(false);
        setAmount(res.result);
      })
      .catch((err) => {
        loader.showLoader(false);
        console.log(err);
      });
  };

  const onSubmit = () => {
    handleCoin();
    fetchBucketAmount();
  };

  const handleDelete = () => {
    fetchDataFromAPI(
      API_URL + NetworkConfiguration.DELETEBUCKET + `/${identity}`,
      "DELETE"
    )
      .then((res) => {
        console.log(res);
        setShowDeleteAlert(false);
        handleCoin();
        successToast(res?.message);
      })
      .catch((err) => {
        console.log(err);
        errorToast(err?.message);
      });
  };

  return (
    <div>
      <div className="bucket__container">
        <div className="bucket__coin__amount">
          <div className="bucket__coin">
            <h4 className="bucket__heading">Coins</h4>
            <br />
            <div className="bucket__icon__para">
              <img className="bucket__icon" src={Coin} alt="coin" />
              <p className="bucket__para">{amount}</p>
            </div>
          </div>
        </div>
        <EditCoins id={id} onSubmit={onSubmit} />
      </div>

      <div className="bucket__table__container">
        <table className="bucket__table">
          <thead>
            <th className="bucket__table__header">S.No.</th>
            <th className="bucket__table__header">Total amount</th>
            <th className="bucket__table__header">
              Reason for increment/decrement
            </th>
            <th className="bucket__table__header">Deducted/Added Coins</th>
            <th className="bucket__table__header">Coin Type</th>
            <th className="bucket__table__header">Changed Amount</th>
            <th className="bucket__table__header">Created At</th>
            <th className="bucket__table__header">Action</th>
          </thead>
          <tbody>
            {bucket.map((data, index) => {
              return (
                <tr>
                  <td className="bucket__table__data">{index + 1}</td>
                  <td className="bucket__table__data">{data?.oldCoins}</td>
                  <td className="bucket__table__data">
                    {data?.reasonDeductionCoins}
                  </td>
                  <td className="bucket__table__data">
                    {data?.deductionCoins}
                  </td>
                  <td className="bucket__table__data">{data?.coinType}</td>
                  <td className="bucket__table__data">{data?.newCoins}</td>
                  <td className="bucket__table__data">
                    {moment(data?.createdAt).format("DD/MM/YYYY , LT")}
                  </td>
                  <td className="bucket__table__data">
                    <AiFillDelete
                      onClick={() => handleDeleteAlert(data?._id)}
                      className="bucket__delete"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <AlertPopUp
        open={showDeleteAlert}
        handleOpen={handleDeleteAlert}
        handleClose={handleDeleteAlertClose}
        header="Delete Alert"
        description="Are you sure you want to delete this bucket row?"
        submitText="Yes"
        cancelText="No"
        onSubmitClick={handleDelete}
        onCancelClick={handleDeleteAlertClose}
      />
    </div>
  );
};

export default Bucket;
