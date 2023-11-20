import "./style.css";

const UserBlockedList = () => {
  return (
    <div className="user__block__list__container">
      <table className="user__block__list__table">
        <thead>
          <th className="user__block__list__header">S.No.</th>
          <th className="user__block__list__header">Host ID</th>
          <th className="user__block__list__header">Host Name</th>
          <th className="user__block__list__header">Date Of Birth</th>
          <th className="user__block__list__header">Email</th>
          <th className="user__block__list__header">Mobile Number</th>
          <th className="user__block__list__header">Action</th>
        </thead>
        <tbody>
          <td className="user__block__list__data">1</td>
          <td className="user__block__list__data">1</td>
          <td className="user__block__list__data">1</td>
          <td className="user__block__list__data">1</td>
          <td className="user__block__list__data">1</td>
          <td className="user__block__list__data">1</td>
          <td className="user__block__list__data">1</td>
        </tbody>
      </table>
    </div>
  );
};

export default UserBlockedList;
