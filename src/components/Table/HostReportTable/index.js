import "./style.css";

const HostReportTable = () => {
  return (
    <div className="host__report__container">
      <table className="host__report__table">
        <thead>
          <th className="host__report__header">S.No.</th>
          <th className="host__report__header">Host ID</th>
          <th className="host__report__header">Host Name</th>
          <th className="host__report__header">Report</th>
          <th className="host__report__header">Report ID</th>
          <th className="host__report__header">Title</th>
          <th className="host__report__header">Reason</th>
        </thead>
        <tbody>
          <td className="host__report__dataoc">1</td>
          <td className="host__report__dataoc">1</td>
          <td className="host__report__dataoc">1</td>
          <td className="host__report__dataoc">1</td>
          <td className="host__report__dataoc">1</td>
          <td className="host__report__dataoc">1</td>
          <td className="host__report__dataoc">1</td>
        </tbody>
      </table>
    </div>
  );
};

export default HostReportTable;
