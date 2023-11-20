import "./style.css";

const HostMomentTable = () => {
  return (
    <div className="host__moment__container">
      <table className="host__moment__table">
        <thead>
          <th className="host__moment__header">S.No</th>
          <th className="host__moment__header">Caption</th>
          <th className="host__moment__header">Likes</th>
          <th className="host__moment__header">Image/Video</th>
          <th className="host__moment__header">Created At</th>
          <th className="host__moment__header">Action</th>
        </thead>
        <tbody>
          <td className="host__moment__data">1</td>
          <td className="host__moment__data">1</td>
          <td className="host__moment__data">1</td>
          <td className="host__moment__data">1</td>
          <td className="host__moment__data">1</td>
          <td className="host__moment__data">1</td>
        </tbody>
      </table>
    </div>
  );
};

export default HostMomentTable;
