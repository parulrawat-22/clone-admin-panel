import "./style.css";

const RechargeTable = () => {
  return (
    <div className="recharge__table__container">
      <table className="recharge__table">
        <thead>
          <th className="recharge__table__heading">S.No</th>
          <th className="recharge__table__heading">Coins Package</th>
          <th className="recharge__table__heading">Amount Paid</th>
          <th className="recharge__table__heading">Payment Mode</th>
        </thead>
        <tbody>
          <td className="recharge__table__body">1</td>
          <td className="recharge__table__body">40</td>
          <td className="recharge__table__body">100</td>
          <td className="recharge__table__body">UPI</td>
        </tbody>
      </table>
    </div>
  );
};

export default RechargeTable;
