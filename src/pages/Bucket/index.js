import { useEffect, useState } from "react";
import EditCoins from "../../components/pages/bucket/EditCoins";
import "./style.css";
import { fetchDataFromAPI } from "../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../network/NetworkConfiguration";

const Bucket = () => {
  const [reason, setReason] = useState();
  const [deductCoins, setDeductCoins] = useState();
  const [id, setId] = useState();

  useEffect(() => {
    fetchBucket();
  });

  const fetchBucket = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.COINSDEDUCTION, "PUT", {
      id: id,
      reason: reason,
      deductCoins: deductCoins,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bucket__container">
      <div className="bucket__coin__amount">
        <div className="bucket__coin">
          <h4>Coins</h4>
          <br />
          <p>₹ 250</p>
        </div>
        <div className="bucket__coin">
          <h4>Amount</h4>
          <br />

          <p>₹ 250</p>
        </div>
      </div>
      <EditCoins />
    </div>
  );
};

export default Bucket;
