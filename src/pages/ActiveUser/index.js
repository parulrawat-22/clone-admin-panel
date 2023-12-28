import Button from "../../components/library/Button";
import "./style.css";

const ActiveUser = () => {
  return (
    <div className="active__user__container">
      <div className="active__user">
        <Button style={{ textAlign: "center" }} text="Send Notification" />
      </div>

      <table className="active__user__table">
        <thead>
          <th className="active__user__header">S.No.</th>
          <th className="active__user__header">S.No.</th>
          <th className="active__user__header">S.No.</th>
          <th className="active__user__header">S.No.</th>
          <th className="active__user__header">S.No.</th>
        </thead>
        <tbody>
          <td className="active__user__data">1</td>
          <td className="active__user__data">1</td>
          <td className="active__user__data">1</td>
          <td className="active__user__data">1</td>
          <td className="active__user__data">1</td>
        </tbody>
      </table>
    </div>
  );
};

export default ActiveUser;
