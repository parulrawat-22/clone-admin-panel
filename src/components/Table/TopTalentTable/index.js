import "./style.css";

const TopTalentTable = () => {
  return (
    <div className="top__talent__container">
      <table className="top__talent__table">
        <thead>
          <th className="top__talent__header">S.No.</th>
          <th className="top__talent__header">User ID</th>
          <th className="top__talent__header">User Name</th>
          <th className="top__talent__header">Sticker Coins</th>
          <th className="top__talent__header">Gift Coins</th>
          <th className="top__talent__header">Video Call Coins</th>
          <th className="top__talent__header">Audio Call Coins</th>
          <th className="top__talent__header">Total Purchase</th>
        </thead>
        <tbody>
          <td className="top__talent__data">1</td>
          <td className="top__talent__data">1</td>
          <td className="top__talent__data">1</td>
          <td className="top__talent__data">1</td>
          <td className="top__talent__data">1</td>
          <td className="top__talent__data">1</td>
          <td className="top__talent__data">1</td>
          <td className="top__talent__data">1</td>
        </tbody>
      </table>
    </div>
  );
};

export default TopTalentTable;
