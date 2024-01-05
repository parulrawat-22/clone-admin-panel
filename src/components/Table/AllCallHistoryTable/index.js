import moment from "moment";
import "./style.css";

const AllCallHistoryTable = ({ callHistory }) => {
  return (
    <div className="top__talent__container">
      <table className="top__talent__table">
        <thead>
          <th className="top__talent__header">S.No.</th>
          <th className="top__talent__header">Date</th>
          <th className="top__talent__header">User ID</th>
          <th className="top__talent__header">User Name</th>
          <th className="top__talent__header">Host ID</th>
          <th className="top__talent__header">Host Name</th>
          <th className="top__talent__header">Coin Spent</th>
          <th className="top__talent__header">Mode</th>
          <th className="top__talent__header">Time Duration</th>
        </thead>
        <tbody>
          {callHistory.map((data, index) => {
            return (
              <tr key={index}>
                <td className="top__talent__data">{index + 1}</td>
                <td className="top__talent__data">
                  {moment(data?.createdAt).format("DD/MM/YYYY")}
                </td>
                <td className="top__talent__data">{data?.userId}</td>
                <td className="top__talent__data">{data?.userId?.name}</td>
                <td className="top__talent__data">{data?.targetId}</td>
                <td className="top__talent__data">{data?.hostId?.name}</td>
                <td className="top__talent__data">{data?.videoCoins}</td>
                <td className="top__talent__data">{data?.callType}</td>
                <td className="top__talent__data">{data?.total_minute}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllCallHistoryTable;
