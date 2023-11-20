import "./style.css";

const PaymentHistoryTable = () => {
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
          <td className="payment__history__data">1</td>
          <td className="payment__history__data">1</td>
          <td className="payment__history__data">1</td>
          <td className="payment__history__data">1</td>
          <td className="payment__history__data">1</td>
          <td className="payment__history__data">1</td>
          <td className="payment__history__data">1</td>
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistoryTable;
