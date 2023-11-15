import "./style.css";

const UserFollowing = () => {
  return (
    <div className="user__following__container">
      <table className="user__following__table">
        <thead>
          <th className="user__following__header">S.No.</th>
          <th className="user__following__header">User ID</th>
          <th className="user__following__header">Name</th>
          <th className="user__following__header">Date Of Birth</th>
          <th className="user__following__header">Email ID</th>
          <th className="user__following__header">Mobile Number</th>
          <th className="user__following__header">Status</th>
        </thead>
        <tbody>
          <td className="user__following__data">1</td>
          <td className="user__following__data">1</td>
          <td className="user__following__data">1</td>
          <td className="user__following__data">1</td>
          <td className="user__following__data">1</td>
          <td className="user__following__data">1</td>
          <td className="user__following__data">1</td>
        </tbody>
      </table>
    </div>
  );
};

export default UserFollowing;
