import Layout from "../../Layout";
import "./style.css";

const CallHistory = () => {
  return (
    <Layout>
      <div className="user__call__history__container">
        <table className="user__call__history__table">
          <thead>
            <th className="user__call__history__header">S.No.</th>
            <th className="user__call__history__header">Host ID</th>
            <th className="user__call__history__header">Host Name</th>
            <th className="user__call__history__header">Coin Spend</th>
            <th className="user__call__history__header">Mode</th>
            <th className="user__call__history__header">Time Duration</th>
            <th className="user__call__history__header">Status</th>
          </thead>
          <tbody>
            <td className="user__call__history__data">1</td>
            <td className="user__call__history__data">1</td>
            <td className="user__call__history__data">1</td>
            <td className="user__call__history__data">1</td>
            <td className="user__call__history__data">1</td>
            <td className="user__call__history__data">1</td>
            <td className="user__call__history__data">1</td>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default CallHistory;
