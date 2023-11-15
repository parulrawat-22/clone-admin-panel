import { AiFillEye } from "react-icons/ai";
import "./style.css";

const UserSticker = () => {
  return (
    <div className="user__sticker__container">
      <table className="user__sticker__table">
        <thead>
          <th className="user__sticker__header">S.No.</th>
          <th className="user__sticker__header">Host Name</th>
          <th className="user__sticker__header">Sticker</th>
        </thead>
        <tbody>
          <td className="user__sticker__data">1</td>
          <td className="user__sticker__data">hii</td>
          <td className="user__sticker__data">
            <AiFillEye className="user__sticker__eye__icon" />
          </td>
        </tbody>
      </table>
    </div>
  );
};

export default UserSticker;
