import "./style.css";

const UserReportTable = () => {
  return (
    <div className="user__report__container">
      <table className="user__report__table">
        <thead>
          <th className="user__report__header">S.No.</th>
          <th className="user__report__header">User ID</th>
          <th className="user__report__header">User Name</th>
          <th className="user__report__header">Report</th>
          <th className="user__report__header">Report ID</th>
          <th className="user__report__header">Title</th>
          <th className="user__report__header">Reason</th>
        </thead>
        <tbody>
          <td className="user__report__data">1</td>
          <td className="user__report__data">12345678</td>
          <td className="user__report__data">rgerii</td>
          <td className="user__report__data">dssa</td>
          <td className="user__report__data">765432</td>
          <td className="user__report__data">yfyfy</td>
          <td className="user__report__data">fuefiohweif</td>
        </tbody>
      </table>
    </div>
  );
};

export default UserReportTable;
