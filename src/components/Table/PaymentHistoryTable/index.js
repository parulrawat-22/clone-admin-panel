import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../../network/NetworkConnection";
import {
  API_URL,
  NetworkConfiguration,
} from "../../../network/NetworkConfiguration";
import { useParams } from "react-router-dom";
import "./style.css";
import { useLoader } from "../../../base/Context/loaderProvider";
import Lottie from "react-lottie";
import noData from "../../../base/Animation/No Data Found.json";
import Pagination from "../../Pagination";
import { useApi } from "../../../base/Context/apiProvider";

const PaymentHistoryTable = () => {
  const [getPaymentHistory, setGetPaymentHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const { id } = useParams();

  const loader = useLoader();
  const apiProvider = useApi();

  useEffect(() => {
    fetchPaymentHistory(apiProvider);
  }, [page, perPage]);

  const fetchPaymentHistory = (apiProvider) => {
    loader.showLoader(true);

    fetchDataFromAPI(
      apiProvider?.apiUrl + NetworkConfiguration.GETPAYMENTHISTORY,
      "POST",
      {
        id: id,
        page,
        perPage,
      }
    )
      .then((res) => {
        loader.showLoader(false);
        setTotalCount(res.totalCount);
        setTotalPages(res.totalPages);
        setGetPaymentHistory(res.result?.payment_history);
      })
      .catch((err) => {
        console.log(err);
        loader.showLoader(false);
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
          {/* <th className="payment__history__header">Phone</th> */}
          <th className="payment__history__header">CreatedAt</th>
          <th className="payment__history__header">Status</th>
        </thead>
        <tbody>
          {getPaymentHistory.length > 0
            ? getPaymentHistory.map((data, index) => {
                return (
                  <tr>
                    <td className="payment__history__data">{index + 1}</td>
                    <td className="payment__history__data">{data?.coins}</td>
                    <td className="payment__history__data">{data?.price}</td>
                    <td className="payment__history__data">
                      {data?.paymentThrough}
                    </td>
                    {/* <td className="payment__history__data">{data?.phone}</td> */}
                    <td className="payment__history__data">
                      {data?.paymentDate}
                    </td>
                    <td className="payment__history__data">{data?.status}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>

      {getPaymentHistory.length > 0 ? (
        <Pagination
          page={page}
          setPage={setPage}
          perPage={perPage}
          setPerPage={setPerPage}
          totalCount={totalCount}
          totalPages={totalPages}
          options={[5, 20, 25, 20]}
        />
      ) : (
        !loader.loaderPopup && (
          <div className="host__no__data__found__icon">
            <Lottie
              options={{ animationData: noData, loop: true }}
              style={{ width: "20rem", height: "20rem" }}
            />
            <p className="payment__no__data">No Data Found</p>
          </div>
        )
      )}
    </div>
  );
};

export default PaymentHistoryTable;
