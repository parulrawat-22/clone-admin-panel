import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";
import "./style.css";

const PaymentHistoryTable = () => {
  const [getPaymentHistory, setGetPaymentHistory] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const fetchPaymentHistory = () => {
    fetchDataFromAPI(API_URL + NetworkConfiguration.GETPAYMENTHISTORY, "POST", {
      id: id,
    })
      .then((res) => {
        setGetPaymentHistory(res.result?.payment_history);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="payment__history__container">
      <table className="payment__history__table">
        <thead>
          <th className="payment__history__header">S.No.</th>
          <th className="payment__history__header">Coins</th>
          <th className="payment__history__header">Price</th>
          <th className="payment__history__header">Mode</th>
          <th className="payment__history__header">Phone</th>
          <th className="payment__history__header">createdAt</th>
          <th className="payment__history__header">Status</th>
        </thead>
        <tbody>
          {getPaymentHistory.map((data, index) => {
            return (
              <tr>
                <td className="payment__history__data">{index + 1}</td>
                <td className="payment__history__data">{data?.coins}</td>
                <td className="payment__history__data">{data?.price}</td>
                <td className="payment__history__data">
                  {data?.paymentThrough}
                </td>
                <td className="payment__history__data">{data?.phone}</td>
                <td className="payment__history__data">{data?.paymentDate}</td>
                <td className="payment__history__data">{data?.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistoryTable;
