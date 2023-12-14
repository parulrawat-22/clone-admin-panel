import "./style.css";

const TopTalentTable = ({ tableData, isHost, page, perPage }) => {
  return (
    <div className="top__talent__container">
      <table className="top__talent__table">
        <thead>
          <th className="top__talent__header">Rank No.</th>
          <th className="top__talent__header">User ID</th>
          <th className="top__talent__header">User Name</th>
          <th className="top__talent__header">Sticker Coins</th>
          <th className="top__talent__header">Gift Coins</th>
          <th className="top__talent__header">Video Call Coins</th>
          <th className="top__talent__header">Audio Call Coins</th>
          {isHost === false && (
            <th className="top__talent__header">Total Purchase</th>
          )}
          {isHost === true && (
            <th className="top__talent__header">Total Earning</th>
          )}
        </thead>
        <tbody>
          {tableData &&
            tableData.length > 0 &&
            tableData.map((data, index) => {
              return (
                <tr>
                  <td className="top__talent__data">
                    {(page - 1) * perPage + index + 1}
                  </td>
                  <td className="top__talent__data">
                    {data?._id ? data?._id : ""}
                  </td>
                  <td className="top__talent__data">
                    {data?.name ? data?.name : ""}
                  </td>
                  <td className="top__talent__data">
                    {data?.stickerCoins ? data?.stickerCoins : ""}
                  </td>
                  <td className="top__talent__data">
                    {data?.giftCoins ? data?.giftCoins : ""}
                  </td>
                  <td className="top__talent__data">
                    {data?.videoCoins ? data?.videoCoins : ""}
                  </td>
                  <td className="top__talent__data">
                    {data?.audioCoins ? data?.audioCoins : ""}
                  </td>
                  {isHost === false && (
                    <td className="top__talent__data">
                      {data?.total_coins ? data?.spentCoins : ""}
                    </td>
                  )}
                  {isHost === true && (
                    <td className="top__talent__data">
                      {data?.host_balance ? data?.host_balance : ""}
                    </td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TopTalentTable;
