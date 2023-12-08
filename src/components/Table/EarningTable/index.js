import "./style.css";

const EarningTable = () => {
  return (
    <div className="earnings__table__container">
      <table className="earnings__table">
        <thead>
          <th className="earnings__table__header">S.No.</th>
          <th className="earnings__table__header">Video Call</th>
          <th className="earnings__table__header">Audio Call</th>
          <th className="earnings__table__header">Call Stickers</th>
          <th className="earnings__table__header">Gifts</th>
          <th className="earnings__table__header">Premium Post</th>
          <th className="earnings__table__header">Post stickers</th>
          <th className="earnings__table__header">Total Earnings</th>
        </thead>
        <tbody>
          <td className="earnings__table__data">1</td>
          <td className="earnings__table__data">1</td>
          <td className="earnings__table__data">1</td>
          <td className="earnings__table__data">1</td>
          <td className="earnings__table__data">1</td>
          <td className="earnings__table__data">1</td>
          <td className="earnings__table__data">1</td>
          <td className="earnings__table__data">1</td>
        </tbody>
      </table>
    </div>
  );
};

export default EarningTable;
